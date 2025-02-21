import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Profile } from '@instapark/types'
import { formatName } from '../utils/field-name'
import Image from 'next/image'
import { Details } from './details'

export const HostCard = ({ host }: { host: Profile }) => {
    return (
        <Card>
            <CardContent className=''>
                <div className="relative h-32">
                    <Image
                        fill
                        src={"/placeholder.svg"}
                        alt={"Listing photo"}
                        className="object-cover rounded-md border"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
