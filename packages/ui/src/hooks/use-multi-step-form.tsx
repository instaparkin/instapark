import {  useMemo, useState } from 'react'
import { MultiStepFormType, Step, SubStep } from '../listings/listings-types';

export const useMultiStepForm = <T extends Record<string, unknown>>({ steps, form }: MultiStepFormType<T>) => {

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0);

  const next = async () => {
    const currentStep = steps[currentStepIndex] as Step<T>;
    const currentSubStep = currentStep.substeps[currentSubStepIndex] as SubStep<T>;
    if (await form.trigger(currentSubStep.fields.map(field => field.name))) {
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
    if (currentSubStepIndex > 0) {
      setCurrentSubStepIndex(currentSubStepIndex - 1)
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setCurrentSubStepIndex(currentStep.substeps.length - 1)
    }
  }

  const isFirstStep = useMemo(() => currentStepIndex === 0 && currentSubStepIndex === 0, [currentStepIndex, currentSubStepIndex]);

  const isLastStep = useMemo(() => {
    const lastStep = steps[steps.length - 1] as Step<T>;
    return currentStepIndex === steps.length - 1 && currentSubStepIndex === lastStep.substeps.length - 1;
  }, [steps, currentStepIndex, currentSubStepIndex]);
  
  function calculateProgress(): number[] {
    return steps.map(step => {
      const totalSubSteps = step.substeps.length;
      const completedSubSteps = step.substeps.filter(subStep => {
        const isSubStepComplete = subStep.fields.every(field => {
          const value = form.getValues([field.name])[0];
          return value !== undefined && value !== null && value !== "";
        });
        return isSubStepComplete;
      }).length;
      const progress = totalSubSteps > 0 ? (completedSubSteps / totalSubSteps) * 100 : 0;
      return progress;
    });
  }

  
  return {
    currentStepIndex,
    currentSubStepIndex,
    next,
    back,
    isFirstStep,
    isLastStep,
    calculateProgress
  }
}
