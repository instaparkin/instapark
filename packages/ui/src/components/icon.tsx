import React, { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface IconProps {
    children: ReactNode
    className?: string
}

export const Icon = ({ children, className }: IconProps) => {
    return (
        <div className={cn('rounded-full border p-2 w-fit', className)}>
            {children}
        </div>
    )
}
