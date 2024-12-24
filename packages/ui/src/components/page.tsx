import React, { ReactNode } from 'react'
import { cn } from '../utils/cn';

interface PageProps {
    children: React.ReactNode
    title?: string
    className?: string
}

interface PageHeaderProps {
    children: ReactNode
}

export const PageHeader = ({ children }: PageHeaderProps) => {
    return (
        <div className=''>
            {children}
        </div>
    )
}

export const Page = ({ children, title, className }: PageProps) => {
    return (
        <div className={cn(className, 'absolute top-28 w-full mx-auto space-y-6')}>
            <div className='container space-y-6'>
                <h1 className='font-bold text-2xl'>{title}</h1>
                {children}
            </div>
        </div>
    )
}
