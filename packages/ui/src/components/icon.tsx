import React, { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface IconProps {
    children: ReactNode;
    className?: string;
}

export const Icon = ({ children, className }: IconProps) => {
    return (
        <div
            className={cn(
                'rounded-full border p-2 w-fit transition-transform duration-200 ease-in-out hover:scale-105',
                className
            )}
        >
            {children}
        </div>
    );
};
