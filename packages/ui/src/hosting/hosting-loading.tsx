import React from "react"
import { Page } from "../components/page"
import { Skeleton } from "../components/skeleton"

export const HostingLoading = () => {
    return (
        <Page>
            <Skeleton className="h-10 w-24" />
            <div className="space-y-4">
                <div className="flex space-x-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-10 w-24 rounded-full" />
                    ))}
                </div>
                <Skeleton className="h-[300px] w-full rounded-md" />
            </div>
        </Page>
    )
}

