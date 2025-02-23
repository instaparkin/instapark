import React from "react"
import { Skeleton } from "../components/skeleton";
import { Avatar, AvatarFallback } from "../components/avatar";

export const HeaderSkeleton = () => (
    <header className="fixed top-0 right-0 z-20 bg-background w-full mx-auto border-b">
        <div className='container flex justify-between py-4'>
            <div className='flex gap-4 items-center'>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-24 hidden sm:block" />
            </div>
            <div className='flex gap-4 items-center p-1.5'>
                <Skeleton className="h-10 w-24" />
                <Avatar>
                    <AvatarFallback>
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    </header>
)