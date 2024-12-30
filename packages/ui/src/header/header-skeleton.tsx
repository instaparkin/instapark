import { Skeleton } from "../components/skeleton";

export const HeaderSkeleton = () => (
    <header className="fixed top-0 right-0 z-20 bg-background w-full mx-auto border-b">
        <div className='container flex justify-between py-4'>
            <div className='flex gap-4 items-center'>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-24 hidden sm:block" />
            </div>
            <div className='flex gap-4 items-center'>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </div>
    </header>
)