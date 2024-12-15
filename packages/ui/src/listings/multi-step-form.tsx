"use client";

import React, { ReactNode, useState } from "react";
import { ControllerRenderProps, Path, UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/form";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useMultiStepForm } from "../hooks/use-multi-step-form";
import { cn } from "../utils/cn";
import { fieldName } from "../utils/field-name";
import { Progress } from "../components/progress";
import { Label } from "../components/label";
import { MultiStepFormType } from "./listings-types";

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
        currentStepIndex,
        currentSubStepIndex,
    } = useMultiStepForm({ steps, form });

    return (
        <div>
            {steps.map((step, index) => {
                return (
                    currentStepIndex === index && (
                        <div key={index}>
                            <h2 className="text-2xl font-semibold text-center my-6">
                                {step.name}
                            </h2>
                            <div>
                                {step.substeps.map((subStep, index) => {
                                    return (
                                        currentSubStepIndex === index && (
                                            <div key={index}>
                                                <h3 className="text-xl font-semibold my-4">
                                                    {subStep.name}
                                                </h3>
                                                {subStep.children}
                                                <div
                                                    className={cn(`${steps[currentStepIndex]?.substeps[currentSubStepIndex]?.fields[1]?.render ? "grid grid-cols-2" : ""}`, subStep.className)}
                                                >
                                                    {subStep.fields.map((field, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <FormField
                                                                    control={form.control}
                                                                    name={field.name}
                                                                    render={({ field: formField }) => {
                                                                        return field.render ? (
                                                                            field.render(formField)
                                                                        ) : (
                                                                            <FormItem>
                                                                                <FormControl>
                                                                                    <div className="group relative">
                                                                                        <Label
                                                                                            htmlFor={fieldName(field.name)}
                                                                                            className="z-10 origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                                                                                        >
                                                                                            <span className="inline-flex bg-background px-2">{fieldName(field.name)}</span>
                                                                                        </Label>
                                                                                        <Input id={fieldName(field.name)} placeholder="" disabled={field.disabled} {...formField} />
                                                                                    </div>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    })}

                                                </div>
                                                <div className="fixed z-10 bg-background py-6 bottom-0 border-t left-0 w-full">
                                                    <div className="container flex flex-col">
                                                        <div className="flex justify-between gap-6 mb-4">
                                                            {
                                                                calculateProgress().map((progress, index) => (
                                                                    <Progress key={index} className="h-2" value={progress} />
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="flex justify-between">
                                                            {!isFirstStep && (
                                                                <Button size={"lg"} onClick={back}>
                                                                    Back
                                                                </Button>
                                                            )}
                                                            {!isLastStep && (
                                                                <Button
                                                                    size={"lg"}
                                                                    type="submit"
                                                                    className="ml-auto"
                                                                    onClick={next}
                                                                >
                                                                    {currentSubStepIndex === steps.length - 1
                                                                        ? "Finish"
                                                                        : "Next"}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
};