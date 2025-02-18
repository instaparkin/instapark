"use client"

import { useState, useMemo } from "react";
import { MultiStepFormType, Step, SubStep } from "../types/multi-step-form-types";
import { useRouter } from "next/navigation";

export const useMultiStepForm = <T extends Record<string, unknown>>({
  steps,
  form,
}: MultiStepFormType<T>) => {
  const router = useRouter();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState<number>(0);

  const next = async () => {
    const currentStep = steps[currentStepIndex] as Step<T>;
    const currentSubStep = currentStep.substeps[currentSubStepIndex] as SubStep<T>;
    if (await form.trigger(currentSubStep?.fields?.map((field) => field.name))) {
      if (currentSubStepIndex < currentStep.substeps.length - 1) {
        setCurrentSubStepIndex(currentSubStepIndex + 1);
      } else if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        setCurrentSubStepIndex(0);
      }
    }
  };

  console.log(form.formState.errors);
  

  const back = () => {
    if (isFirstStep) {
      router.back();
    } else if (currentSubStepIndex > 0) {
      setCurrentSubStepIndex(currentSubStepIndex - 1);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      const previousStep = steps[currentStepIndex - 1] as Step<T>;
      setCurrentSubStepIndex(previousStep.substeps.length - 1);
    }
  };

  const isFirstStep = useMemo(() => currentStepIndex === 0 && currentSubStepIndex === 0, [currentStepIndex, currentSubStepIndex]);

  const isLastStep = useMemo(() => {
    if (!steps.length) return false;
    const lastStep = steps[steps.length - 1] as Step<T>;
    const isLastStepIndex = currentStepIndex === steps.length - 1;
    const isLastSubStepIndex = currentSubStepIndex === (lastStep.substeps?.length || 0) - 1;
    return isLastStepIndex && isLastSubStepIndex;
  }, [steps, currentStepIndex, currentSubStepIndex]);

  const isLastSecondStep = useMemo(() => {
    if (!steps.length) return false;
    const lastStep = steps[steps.length - 1] as Step<T>;
    const isLastStepIndex = currentStepIndex === steps.length - 1;
    const isLastSubStepIndex = currentSubStepIndex === (lastStep.substeps?.length || 0) - 2;
    return isLastStepIndex && isLastSubStepIndex;
  }, [steps, currentStepIndex, currentSubStepIndex]);

  const calculateProgress = (): number[] => {
    return steps.map((step, stepIndex) => {
      if (stepIndex < currentStepIndex) {
        return 100;
      }
      if (stepIndex === currentStepIndex) {
        const substepCount = step.substeps.length;
        const isLastStep = stepIndex === steps.length - 1;
        if (isLastStep) {
          return (currentSubStepIndex / (substepCount - 1)) * 100;
        }
        const progress = (currentSubStepIndex / substepCount) * 100;
        return progress;
      }
      return 0;
    });
  };

  const currentStep = steps[currentStepIndex] as Step<T>;

  const currentSubStep = currentStep.substeps[currentSubStepIndex] as SubStep<T>;

  return {
    currentStepIndex,
    currentSubStepIndex,
    setCurrentSubStepIndex,
    next,
    back,
    currentStep,
    currentSubStep,
    isFirstStep,
    isLastStep,
    isLastSecondStep,
    calculateProgress,
  };
};