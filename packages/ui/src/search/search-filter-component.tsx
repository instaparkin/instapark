import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'

interface IFilterComponent {
    title: string
    children: ReactNode
}

export const SearchFilterComponent = ({ title, children }: IFilterComponent) => {
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
