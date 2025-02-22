import React from "react"
import { Card, CardContent, CardFooter } from "../components/card"
import { Skeleton } from "../components/skeleton"

interface HomeListingsSkeletonProps {
    count?: number
}

export const HomeListingsSkeleton: React.FC<HomeListingsSkeletonProps> = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <Card className="overflow-hidden" key={index}>
                    <div className="relative aspect-[4/3]">
                        <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-4 flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Skeleton className="h-4 w-24" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
