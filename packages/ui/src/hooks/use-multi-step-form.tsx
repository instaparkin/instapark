"use client"

import React, { ReactElement, useState } from 'react'

export type StepProps = {
    title: string
    component: ReactElement
}

export const UseMultiStepForm = ({ steps }: { steps: StepProps[] }) => {
    const [data, setData] = useState();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        if (currentStepIndex >= steps.length - 1) {
            return
        }
        setCurrentStepIndex(currentStepIndex + 1)
    }

    function back() {
        if (currentStepIndex <= 0) {
            return
        }
        setCurrentStepIndex(currentStepIndex - 1)
    }

    function isFirstIndex() {
        return currentStepIndex === 0
    }

    function isLastIndex() {
        return currentStepIndex === steps.length - 1
    }

    function onSubmit() {

    }

    return {
        next,
        back,
        isFirstIndex,
        isLastIndex,
        currentStepIndex,
        steps
    }
}
