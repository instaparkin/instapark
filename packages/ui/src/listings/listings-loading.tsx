import React from 'react'
import { Page } from '../components/page'
import { Skeleton } from '../components/skeleton'
import { Card, CardContent, CardFooter } from "../components/card"

export const ListingsLoading = () => {
    const loadingPlaceholders = Array.from({ length: 6 });
    return (
        <Page title='Loading'>
            <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-10 w-full max-w-sm" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadingPlaceholders.map((_, index) => (
                        <Card key={index} className="overflow-hidden">
                            <div className="relative aspect-video">
                                <Skeleton className="h-full w-full" />
                                <Skeleton className="absolute top-2 right-2 h-8 w-8 rounded-full" />
                            </div>
                            <CardContent className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2 mb-2" />
                                <div className="flex items-center gap-1">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-9 w-20" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </Page>
    )
}

