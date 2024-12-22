import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./form";
import { Button } from "./button";
import { Progress } from "./progress";
import { useMultiStepForm } from "../hooks/use-multi-step-form";
import { MultiStepFormType, MultiStepNavigationProps, MultiStepProgressProps, Step } from "../types/multi-step-form-types";
import { Input } from "./input";

const MultiStepNavigation = <T extends Record<string, unknown>>({
    isFirstStep,
    isLastStep,
    currentSubStepIndex,
    steps,
    back,
    next,
}: MultiStepNavigationProps<T>) => (
    <div className="flex justify-between">
        {
            <Button size="lg" onClick={back}>
                Back
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
}: MultiStepFormType<T>) => {
    const {
        calculateProgress,
        next,
        back,
        isFirstStep,
        isLastStep,
        currentSubStepIndex,
        currentStep,
        currentSubStep
    } = useMultiStepForm({ steps, form });

    const onSubmit = async (data: T) => {
        try {
            await fetch("http://localhost:8087/listings/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error("Submission failed:", error);
            alert("An error occurred during submission. Please try again.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            next={next}
                            back={back}
                            steps={steps}
                            currentSubStepIndex={currentSubStepIndex}
                        />
                    </div>
                </div>
            </form >
        </Form >
    );
};
