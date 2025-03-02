import React from 'react';
import { cn } from '../utils/cn';
import { Separator } from './separator';
import { Skeleton } from './skeleton';

export interface Item {
	field: string | React.ReactNode;
	value: string | number | React.ReactNode;
	separator?: boolean;
	className?: string;
	visible?: boolean;
}

interface DetailsProps {
	items: Item[];
	className?: string;
}

export function Details({ items, className }: DetailsProps) {
	return (
		<div className={cn('grid gap-3', className)}>
			{items.map(({ separator, visible = true, field, value }, index) => (
				<div key={index}>
					{separator && <Separator className="my-2" />}
					{visible && (
						<div key={index} className="flex justify-between gap-2 sm:gap-4">
							<div className="text-muted-foreground text-sm">{field}</div>
							<div className={cn('text-sm font-medium')}>{value}</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

interface DetailsSkeletonProps {
	items: number;
	className?: string;
}

export function DetailsSkeleton({ items, className }: DetailsSkeletonProps) {
	return (
		<div className={cn('grid gap-3', className)}>
			{Array.from({ length: items }).map((_, index) => (
				<div key={index} className="flex justify-between gap-2 sm:gap-4">
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-5 w-16" />
				</div>
			))}
		</div>
	);
}
