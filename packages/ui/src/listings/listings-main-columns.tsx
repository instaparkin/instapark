import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Listing } from '../__generated__/graphql';
import { cn } from '../utils/cn';
import { timeInInstapark } from '../utils/dayjs';
import Image from 'next/image';
import { formatPrice } from '../utils/field-name';

export const listingMainColumns: ColumnDef<Listing>[] = [
	{
		accessorKey: 'photos',
		header: 'Listing',
		cell: ({ cell }) => {
			const value = cell.getValue() as string[];
			return (
				<div className="relative h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
					<Image
						fill
						src={value.at(0) as string}
						alt={`Listing Photo`}
						className="rounded-lg border object-cover"
					/>
				</div>
			);
		},
	},
	{
		id: 'id',
		accessorKey: 'id',
		header: 'Listing Id',
		cell: ({ cell }) => {
			return (
				<div className="line-clamp-1 w-20">{cell.getValue() as string}</div>
			);
		},
	},
	{
		accessorKey: 'city',
		header: 'City',
	},
	{
		accessorKey: 'street',
		header: 'Street',
	},
	{
		accessorKey: 'pincode',
		header: 'Pincode',
	},
	{
		accessorKey: 'basePrice',
		header: 'Base Price',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'pphbi',
		header: 'Bike',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'pphcr',
		header: 'Car',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'pphcy',
		header: 'Cycle',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'isOpen',
		header: 'Status',
		cell: ({ cell }) => {
			const value = cell.getValue() as string;
			return (
				<div
					className={cn(
						value.toString() === 'true'
							? 'bg-lime-200 p-2 text-lime-700'
							: 'bg-red-200 p-2 text-red-700',
						'w-fit rounded-sm',
					)}
				>
					{value.toString() === 'true' ? 'Open' : 'Close'}
				</div>
			);
		},
	},
	{
		accessorKey: 'updatedAt',
		header: 'Last updated',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{timeInInstapark(value, false)}</div>;
		},
	},
];
