'use client';

import React from 'react';
import { Skeleton } from '../components/skeleton';
import { ShieldCheck } from 'lucide-react';

export function HomeListingsDetailedSkeleton() {
	return (
		<div className="mx-auto max-w-7xl animate-pulse space-y-10 px-4 py-8">
			{/* Header */}
			<div className="mb-6 flex items-center justify-between">
				<Skeleton className="h-8 w-64" />
			</div>

			{/* Image swiper */}
			<div className="relative aspect-video">
				<Skeleton className="h-full w-full rounded-lg" />
			</div>

			{/* User info */}
			<div className="flex items-center gap-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-5 w-40" />
					<Skeleton className="h-4 w-24" />
				</div>
			</div>

			{/* Pricing and FAQs section */}
			<div className="col-span-2 flex flex-col gap-6 lg:flex-row">
				{/* Pricing calculator */}
				<div className="w-full lg:w-1/2">
					<div className="space-y-4 rounded-lg border p-6">
						<Skeleton className="h-6 w-32" />
						<div className="space-y-3">
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="space-y-2 pt-4">
							<div className="flex justify-between">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-16" />
							</div>
							<div className="flex justify-between">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-4 w-16" />
							</div>
							<div className="flex justify-between">
								<Skeleton className="h-4 w-28" />
								<Skeleton className="h-4 w-16" />
							</div>
							<div className="flex justify-between pt-2">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-20" />
							</div>
						</div>
						<Skeleton className="mt-4 h-10 w-full" />
					</div>
				</div>

				{/* FAQs */}
				<div className="lg:w-lg w-full">
					<Skeleton className="mb-4 h-6 w-24" />

					{/* FAQ accordion items */}
					<div className="space-y-4">
						{Array(4)
							.fill(0)
							.map((_, i) => (
								<div key={i} className="border-b py-3">
									<div className="flex items-center justify-between">
										<Skeleton className="h-5 w-3/4" />
										<div className="h-4 w-4 rounded-full bg-gray-200" />
									</div>
									{i === 0 && <Skeleton className="mt-2 h-20 w-full" />}
								</div>
							))}
					</div>

					{/* Security notice */}
					<div className="bg-primary-foreground my-6 flex grow gap-3 rounded-md border p-4">
						<ShieldCheck
							className="mt-0.5 shrink-0 text-blue-500/30"
							size={16}
							aria-hidden="true"
						/>
						<Skeleton className="h-4 w-full max-w-xs" />
					</div>
				</div>
			</div>

			{/* Map */}
			<Skeleton className="h-[300px] w-full rounded-lg" />
		</div>
	);
}
