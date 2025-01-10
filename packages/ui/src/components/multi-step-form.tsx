"use client"

import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form";
import { Button } from "./button";
import { Progress } from "./progress";
import { useMultiStepForm } from "../hooks/use-multi-step-form";
import { MultiStepFormType, MultiStepNavigationProps, MultiStepProgressProps, Step } from "../types/multi-step-form-types";
import { Input } from "./input";
import { fieldName } from "../utils/field-name";
import toast from "react-hot-toast";

const MultiStepNavigation = <T extends Record<string, unknown>>({
    isLastStep,
    back,
    next,
    isLastSecondStep
}: MultiStepNavigationProps<T>) => (
    <div className="flex justify-between">
        {!isLastStep &&
            <Button size="lg" onClick={back}>
                {"Back"}
            </Button>
        }
        {!isLastStep && !isLastSecondStep && <Button
            size="lg"
            className="ml-auto"
            onClick={next}
        >
            {"Next"}
        </Button>
        }
        {isLastSecondStep && <Button
            size="lg"
            type="submit"
        >
            {"Finish"}
        </Button>
        }
    </div>
);

const MultiStepProgress = ({ calculateProgress }: MultiStepProgressProps) => (
    <div className="flex justify-between gap-6 mb-4">
        {
            calculateProgress().map((progress, index) => (
                <Progress key={index} className="h-2" value={progress} />
            ))
        }
    </div>
)

export const MultiStepForm = <T extends Record<string, unknown>>({
    form,
    steps,
    redisPrefix,
    redisSuffix,
    onSubmit = () => { }
}: MultiStepFormType<T>) => {
    const {
        calculateProgress,
        next,
        back,
        isFirstStep,
        isLastStep,
        currentSubStepIndex,
        currentSubStep,
        isLastSecondStep,
        setSubmitted
    } = useMultiStepForm({ steps, form, redisPrefix, redisSuffix });

    const handleSubmit = async (data: T) => {
        setSubmitted();
        try {
            onSubmit({ data });
            const deleteResponse = await fetch(`http://localhost:8080/listings/redis/del/${redisPrefix}-${redisSuffix}`, {
                method: "DELETE",
            });

            if (!deleteResponse.ok) {
                throw new Error(`Error deleting Redis entry: ${deleteResponse.status} - ${deleteResponse.statusText}`);
            }
            next();
        } catch (error) {
            toast.error("Error: " + error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                {currentSubStepIndex === 0 ? null :
                    <div className="text-center text-3xl font-semibold mb-6">{currentSubStep.name}</div>}
                {currentSubStep.component ?
                    <currentSubStep.component form={form} /> : (
                        currentSubStep.fields?.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormLabel>{fieldName(field.name)}</FormLabel>
                                        <FormControl>
                                            <Input {...formField} value={formField.value as string} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))
                    )}
                <div className="fixed z-10 bg-background py-6 bottom-0 border-t left-0 w-full">
                    <div className="container flex flex-col">
                        <MultiStepProgress calculateProgress={() => calculateProgress()} />
                        <MultiStepNavigation
                            isFirstStep={isFirstStep}
                            isLastStep={isLastStep}
                            isLastSecondStep={isLastSecondStep}
                            next={next}
                            back={back}
                            steps={steps}
                            currentSubStepIndex={currentSubStepIndex as number}
                        />
                    </div>
                </div>
            </form >
        </Form >
    );
};