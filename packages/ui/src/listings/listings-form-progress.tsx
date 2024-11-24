import React from 'react'
import { Progress } from '../components/progress';

type ProgressBarProps = {
    progress: [number, number, number];
  }  

export const ListingsFormProgress = ({ progress }: ProgressBarProps) => {
    return (
        <div className="flex gap-2">
            {progress.map((value, index) => (
                <Progress key={index} value={value} className="w-full" />
            ))}
        </div>
    )
}
