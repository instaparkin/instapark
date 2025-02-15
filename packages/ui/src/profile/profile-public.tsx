import React from 'react'
import { Card, CardContent, CardHeader } from '../components/card'

interface HostInfoProps {
    userId: string
    name: string
    hostingDuration: string
    reviews: number
    rating: number
    location?: string
}


export const ProfilePublic = () => {
    
    return (
        <div>
            <Card>
                <CardHeader>
        
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}
