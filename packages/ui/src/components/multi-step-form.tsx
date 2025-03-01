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
import { MultiStepFormType, MultiStepNavigationProps, MultiStepProgressProps } from "../types/multi-step-form-types";
import { Input } from "./input";
import { fieldName } from "../utils/field-name";
import toast from "react-hot-toast";

const MultiStepNavigation = <T extends Record<string, unknown>>({
    isLastStep,
    back,
    next,
}: MultiStepNavigationProps<T>) => (
    <div className="flex justify-between">
        {
            <Button size="lg" onClick={back}>
                {"Back"}
            </Button>
        }
        {!isLastStep && <Button
            size="lg"
            className="ml-auto"
            onClick={next}
        >
            {"Next"}
        </Button>
        }
        {isLastStep && <Button
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
    } = useMultiStepForm({ steps, form });

    const handleSubmit = async (data: T) => {
        try {
            onSubmit({ data });
            next();
        } catch (error) {
            toast.error("Error: " + error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mb-32">
                    {currentSubStepIndex === 0 ? null :
                        <div className="text-center text-3xl font-semibold mb-6">{currentSubStep.name}</div>}
                    {currentSubStep.component ?
                        <currentSubStep.component form={form} /> : (
                            <div className="max-w-[630px] mx-auto">
                                {
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
                                }
                            </div>
                        )}
                </div>
                <div className="fixed z-10 py-6 bottom-0 border-t left-0 w-full bg-background">
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