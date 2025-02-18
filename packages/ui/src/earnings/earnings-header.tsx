import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card'

const EARNINGS_HEADER_CONSTANTS =
    [
        {
            name: "Total Earnings",
            value: `$20`,
            Description: "Amount You have earned"
        },
        {
            name: "Total Earnings",
            value: `$20`,
            Description: "Amount You have earned"
        },
        {
            name: "Total Earnings",
            value: `$20`,
            Description: "Amount You have earned"
        }
    ]

export const EarningsHeader = () => {
    return (
        <div className='grid grid-cols-3 gap-6'>
            {
                EARNINGS_HEADER_CONSTANTS.map((e, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>{e.name}</CardTitle>
                            <CardDescription>
                                {e.Description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='text-xl'>
                                {e.value}
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}
