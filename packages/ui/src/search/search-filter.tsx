import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'

interface SearchFilterProps {
    title: string
    children: ReactNode
}

export const SearchFilter = ({ title, children }: SearchFilterProps) => {
    return (
        <Card className='border-none'>
            <CardHeader className='px-0'>
                <CardTitle className='text-lg font-medium'>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className='border-b px-0'>
                {children}
            </CardContent>
        </Card>
    )
}
