import React from "react";
import { Card } from "../components/card"
import { Skeleton } from "../components/skeleton"

export function ListingLoadingSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px]">
                <Skeleton className="col-span-2 row-span-2 h-full rounded-lg" />
                <Skeleton className="hidden md:block h-[198px] rounded-lg" />
                <Skeleton className="hidden md:block h-[198px] rounded-lg" />
                <Skeleton className="hidden md:block h-[198px] rounded-lg" />
                <Skeleton className="hidden md:block h-[198px] rounded-lg" />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    {/* Listing Title */}
                    <Skeleton className="h-6 w-3/4" />

                    {/* Host Info */}
                    <Card className="p-6">
                        <div className="flex gap-4 mb-6">
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Host Details */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                {/* Pricing Calculator */}
                <div className="hidden md:block">
                    <Card className="p-6 space-y-6">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </Card>
                </div>
            </div>

            {/* Map Placeholder */}
            <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
    )
}

