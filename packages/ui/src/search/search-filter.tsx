import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'

interface SearchFilterProps {
    title: string
    children: ReactNode
}

export const SearchFilter = ({ title, children }: SearchFilterProps) => {
    return (
        <Card className='border-none'>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className='border-b'>
                {children}
            </CardContent>
        </Card>
    )
}
