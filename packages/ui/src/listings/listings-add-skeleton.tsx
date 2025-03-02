import React from 'react';
import { Page } from '../components/page';
import { Card, CardDescription, CardTitle } from '../components/card';
import { Skeleton } from '../components/skeleton';
import { Separator } from '../components/separator';

export const ListingsAddSkeleton = () => {
	return (
		<Page>
			<Card className="grid h-96 border-none shadow-none lg:grid-cols-2">
				<div className="flex flex-col justify-end space-y-4">
					<CardDescription>
						<Skeleton className="h-4 w-20" />
					</CardDescription>
					<CardTitle>
						<Skeleton className="h-9 w-3/4" />
					</CardTitle>
					<Separator />
					<CardDescription>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="mt-2 h-4 w-5/6" />
						<Skeleton className="mt-2 h-4 w-4/6" />
					</CardDescription>
				</div>
			</Card>
			<div className="bg-background fixed bottom-0 left-0 z-10 w-full border-t py-6">
				<div className="container">
					<Skeleton className="mb-4 h-2 w-full" />
					<div className="flex justify-between">
						<Skeleton className="h-10 w-24" />
						<Skeleton className="h-10 w-24" />
					</div>
				</div>
			</div>
		</Page>
	);
};
