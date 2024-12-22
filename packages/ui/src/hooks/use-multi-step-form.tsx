"use client"

import { useMemo, useState } from 'react'
import { MultiStepFormType, Step, SubStep } from '../types/multi-step-form-types';
import { useRouter } from "next/navigation"

export const useMultiStepForm = <T extends Record<string, unknown>>({ steps, form }: MultiStepFormType<T>) => {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0);

  const next = async () => {
    const currentStep = steps[currentStepIndex] as Step<T>;
    const currentSubStep = currentStep.substeps[currentSubStepIndex] as SubStep<T>;
    if (await form.trigger(currentSubStep?.fields?.map(field => field.name))) {
      if (currentSubStepIndex < currentStep.substeps.length - 1) {
        setCurrentSubStepIndex(currentSubStepIndex + 1)
      } else if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1)
        setCurrentSubStepIndex(0)
      }
    }
  }

  const back = () => {
    const currentStep = steps[currentStepIndex] as Step<T>;
    if (isFirstStep) {
      router.back()
    }
    if (currentSubStepIndex > 0) {
      setCurrentSubStepIndex(currentSubStepIndex - 1)
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setCurrentSubStepIndex(currentStep.substeps.length - 1)
    }
  }

  const isFirstStep = useMemo(() => currentStepIndex === 0 && currentSubStepIndex === 0, [currentStepIndex, currentSubStepIndex]);

  const isLastStep = useMemo(() => {
    // Ensure there are steps to process
    if (!steps.length) return false;

    // Fetch the last step
    const lastStep = steps[steps.length - 1] as Step<T>;

    // Validate if current step is the last and current substep matches the last substep
    const isLastStepIndex = currentStepIndex === steps.length - 1;
    const isLastSubStepIndex =
      currentSubStepIndex === (lastStep.substeps?.length || 0) - 1;

    return isLastStepIndex && isLastSubStepIndex;
  }, [steps, currentStepIndex, currentSubStepIndex]);


  function calculateProgress(): number[] {
    return steps.map((step, stepIndex) => {
      if (stepIndex < currentStepIndex) return 100;
      if (stepIndex === currentStepIndex) {
        const substepProgress = ((currentSubStepIndex) / step.substeps.length) * 100;
        return substepProgress;
      }
      return 0;
    });
  }

  const currentStep = steps[currentStepIndex] as Step<T>

  const currentSubStep = currentStep.substeps[currentSubStepIndex] as SubStep<T>

  return {
    currentStepIndex,
    currentSubStepIndex,
    next,
    back,
    currentStep,
    currentSubStep,
    isFirstStep,
    isLastStep,
    calculateProgress
  }
}
