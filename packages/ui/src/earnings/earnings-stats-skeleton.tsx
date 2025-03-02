import React from 'react';
import { Card, CardContent, CardHeader } from '../components/card';
import { Skeleton } from '../components/skeleton';

export const EarningsStatsSkeleton = () => {
	return (
		<div className="space-y-6">
			<Card className="bg-primary-foreground">
				<CardContent className="p-6">
					<div className="space-y-4 md:space-y-2">
						<Skeleton className="h-4 w-24" />
						<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
							<Skeleton className="h-8 w-40" />
							<Skeleton className="h-10 w-full sm:w-40" />
						</div>
						<Skeleton className="h-4 w-64" />
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(4)].map((_, i) => (
					<Card key={i} className={i === 3 ? 'hidden md:block lg:hidden' : ''}>
						<CardHeader className="pb-2">
							<Skeleton className="h-4 w-24" />
						</CardHeader>
						<CardContent>
							<Skeleton className="mb-2 h-6 w-32" />
							<Skeleton className="mb-1 h-3 w-40" />
							<Skeleton className="h-3 w-16" />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};
