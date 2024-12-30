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
        <div>
            {children}
        </div>
    )
}

export const Page: React.FC<PageProps> = ({
    children,
    title,
    className,
}) => {
    return (
        <main className={cn('relative top-16 w-full mx-auto space-y-6 pb-12', className)}>
            <div className={cn('container space-y-6')}>
                {title && (
                        <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">{title}</h1>
                )}
                {children}
            </div>
        </main>
    )
}