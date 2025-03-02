'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { unixSecToMonthYearTime } from '../utils/dayjs';
import { HostBooking, Vehicle } from '../__generated__/graphql';
import { formatPrice } from '../utils/field-name';
import { FaCarAlt, FaMotorcycle } from 'react-icons/fa';
import { PiBicycleDuotone } from 'react-icons/pi';

export const columns: ColumnDef<HostBooking>[] = [
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
			const value = cell.getValue() as number;
			return <div className="truncate">{unixSecToMonthYearTime(value)}</div>;
		},
	},
	{
		accessorKey: 'booking.endDate',
		header: 'End Date ',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div className="truncate">{unixSecToMonthYearTime(value)}</div>;
		},
	},
	{
		accessorKey: 'booking.basePrice',
		header: 'Base Price',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'booking.totalPrice',
		header: 'Total Price',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'booking.parkingPrice',
		header: 'Parking Price',
		cell: ({ cell }) => {
			const value = cell.getValue() as number;
			return <div>{formatPrice(value)}</div>;
		},
	},
	{
		accessorKey: 'booking.vehicle',
		header: 'Vehicle',
		cell: ({ cell }) => {
			const value = cell.getValue() as Vehicle;
			switch (value) {
				case Vehicle.Car:
					return (
						<div className="flex items-center gap-2">
							<FaCarAlt className="h-4 w-4" />
							<span>{value}</span>
						</div>
					);
				case Vehicle.Bike:
					return (
						<div className="flex items-center gap-2">
							<FaMotorcycle className="h-4 w-4" />
							<span>{value}</span>
						</div>
					);
				case Vehicle.Cycle:
					return (
						<div className="flex items-center gap-2">
							<PiBicycleDuotone className="h-4 w-4" />
							<span>{value}</span>
						</div>
					);
			}
		},
	},
];
