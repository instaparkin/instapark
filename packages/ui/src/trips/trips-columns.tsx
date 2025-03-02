'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { unixSecToMonthYearTime } from '../utils/dayjs';
import { BookingsBuyer, Listing } from '../__generated__/graphql';
import { formatPrice } from '../utils/field-name';
import { ListingMini } from '../components/listing-mini';

export const columns: ColumnDef<BookingsBuyer>[] = [
	{
		id: 'bookingId',
		accessorKey: 'booking.id',
		header: 'Booking Id',
	},
	{
		accessorKey: 'listing',
		header: 'Listing',
		cell: ({ cell }) => {
			const value = cell.getValue() as Listing;
			return <ListingMini listing={value} />;
		},
	},
	{
		accessorKey: 'booking.totalPrice',
		header: 'Total',
		cell: ({ cell }) => {
			return <div>{formatPrice(cell.getValue() as number)}</div>;
		},
	},
	{
		accessorKey: 'booking.status',
		header: 'Status',
		cell: ({ cell }) => {
			const value = cell.getValue();
			switch (value) {
				case 'Booked':
					return (
						<div className="w-fit rounded-sm bg-blue-200 p-2 text-blue-700">
							{value}
						</div>
					);
				case 'Completed':
					return (
						<div className="w-fit rounded-sm bg-lime-200 p-2 text-lime-700">
							{value}
						</div>
					);
				case 'OnGoing':
					return (
						<div className="w-fit rounded-sm bg-yellow-200 p-2 text-yellow-700">
							{value}
						</div>
					);
			}
		},
	},
	{
		accessorKey: 'booking.startDate',
		header: 'Start Date',
		cell: ({ cell }) => {
			const value = cell.getValue();
			return <div>{unixSecToMonthYearTime(value as unknown as number)}</div>;
		},
	},
	{
		accessorKey: 'booking.endDate',
		header: 'End Date ',
		cell: ({ cell }) => {
			const value = cell.getValue();
			return <div>{unixSecToMonthYearTime(value as unknown as number)}</div>;
		},
	},
];
