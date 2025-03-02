import React from 'react';
import { Skeleton } from '../components/skeleton';
import { Avatar, AvatarFallback } from '../components/avatar';

export const HeaderSkeleton = () => (
	<header className="bg-background fixed right-0 top-0 z-20 mx-auto w-full border-b">
		<div className="container flex justify-between py-4">
			<div className="flex items-center gap-4">
				<Skeleton className="h-10 w-10 rounded-full" />
				<Skeleton className="hidden h-6 w-24 sm:block" />
			</div>
			<div className="flex items-center gap-4 p-1.5">
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
);
