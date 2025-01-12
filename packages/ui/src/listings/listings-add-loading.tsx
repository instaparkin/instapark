import React from 'react'
import { Page } from '../components/page'
import { Card, CardDescription, CardTitle } from '../components/card'
import { Skeleton } from '../components/skeleton'
import { Separator } from '../components/separator'

export const ListingsAddLoading = () => {
    return (
        <Page>
            <Card className="border-none shadow-none h-96 grid lg:grid-cols-2">
                <div className="flex flex-col space-y-4 justify-end">
                    <CardDescription>
                        <Skeleton className="h-4 w-20" />
                    </CardDescription>
                    <CardTitle>
                        <Skeleton className="h-9 w-3/4" />
                    </CardTitle>
                    <Separator />
                    <CardDescription>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                        <Skeleton className="h-4 w-4/6 mt-2" />
                    </CardDescription>
                </div>
            </Card>
            <div className="fixed z-10 bg-background py-6 bottom-0 border-t left-0 w-full">
                <div className="container">
                    <Skeleton className="h-2 w-full mb-4" />
                    <div className="flex justify-between">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </div>
        </Page>
    )
}

