'use client';

import { useQuery } from '@apollo/client';
import React from 'react';
import { DataTable } from '../components/data-table';
import { paymentsColumns } from './payments-column';
import { Details } from '../components/details';
import { unixSecToMonthYearTime } from '../utils/dayjs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { formatPrice } from '../utils/field-name';
import { useAuth } from '../hooks/use-auth';
import { GET_TRIP_DETAILED } from '../graphql/get-trip-detailed';
import { BookingStatus, Listing, Payment } from '../__generated__/graphql';
import { UserMini } from '../components/user-mini';
import { ListingMini } from '../components/listing-mini';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '../components/input-otp';
import { generateGoogleMapsLink } from '@instapark/common';
import Link from 'next/link';
import { Button } from '../components/button';
import { CompleteOrderButton } from './complete-order-button';
import { Phone } from 'lucide-react';

export const TripDetailed = ({ id }: { id: string }) => {
	const { userId } = useAuth();
	const { data, loading } = useQuery(GET_TRIP_DETAILED, {
		variables: {
			id,
			userId,
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	const booking = data?.BookingQuery?.buyerBookings?.at(0)?.booking;
	const orders = booking?.payments;
	const listing = data?.BookingQuery?.buyerBookings?.at(0)?.listing;
	const host = listing?.user;
	const otp = booking?.otp?.otp;
	console.log(booking?.status);

	const CheckInDetails = [
		{
			name: 'Host',
			content: () => (
				<UserMini
					className="border-none"
					host={true}
					firstName={host?.firstName as string}
					lastName={host?.lastName as string}
					timeJoined={host?.timeJoined as number}
				/>
			),
		},
		{
			name: booking?.status === 'Booked' ? 'OTP' : 'Contact',
			content: () =>
				booking?.status === 'Booked' ? (
					<InputOTP
						maxLength={6}
						defaultValue={otp?.toString()}
						readOnly
						className="flex flex-col"
					>
						<InputOTPGroup>
							<InputOTPSlot defaultValue={otp?.toString().at(0)} index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
				) : (
					<div className="my-6 flex grow items-center gap-6 rounded-md border p-4">
						<Phone size={20} />
						{listing?.user?.phoneNumber}
					</div>
				),
		},
		{
			name: 'Location',
			content: () => (
				<Button asChild variant={'link'} className="line-clamp-3 p-0">
					<Link
						className="text-wrap text-blue-500"
						target="_blank"
						href={generateGoogleMapsLink(
							listing?.latitude as number,
							listing?.longitude as number,
						)}
					>
						{generateGoogleMapsLink(
							listing?.latitude as number,
							listing?.longitude as number,
						)}
					</Link>
				</Button>
			),
		},
	];
	return (
		<div className="mx-auto max-w-5xl space-y-6">
			{booking?.status === BookingStatus.Completed ? null : (
				<div className="flex items-center justify-between rounded-sm border bg-white p-6 dark:bg-black">
					<h2 className="text-xl font-semibold">Final Payment</h2>
					<CompleteOrderButton
						bookingId={booking?.id as string}
						hostId={listing?.userId as string}
						listingId={listing?.id as string}
						basePrice={booking?.basePrice as number}
						parkingPrice={booking?.parkingPrice as number}
						totalPrice={booking?.totalPrice as number}
						ipFee={booking?.ipFee as number}
					/>
				</div>
			)}
			<div className="flex flex-col justify-between gap-6 lg:flex-row">
				<Card className="w-full">
					<CardHeader>
						<CardTitle>{'Check-In Details'}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{CheckInDetails.map((c, i) => (
							<div key={i} className="space-y-4">
								<h2 className="text-muted-foreground font-semibold">
									{c.name}
								</h2>
								{<c.content />}
							</div>
						))}
					</CardContent>
				</Card>
				<Card className="w-full lg:max-w-md">
					<CardHeader>
						<CardTitle>{'Booking Summary'}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-6">
							<ListingMini listing={listing as Listing} />
							<Details
								items={[
									{
										field: 'Start Date',
										value: unixSecToMonthYearTime(booking?.startDate as number),
									},
									{
										field: 'End Date',
										value: unixSecToMonthYearTime(booking?.endDate as number),
									},
									{
										field: 'Base Price',
										value: formatPrice(booking?.basePrice as number),
									},
									{
										field: 'Instapark Fee',
										value: formatPrice(booking?.ipFee as number),
									},
									{
										field: 'Parking Price',
										value: formatPrice(booking?.parkingPrice as number),
									},
									{
										field: 'Total Price',
										value: formatPrice(booking?.totalPrice as number),
										separator: true,
									},
								]}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Payment Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<DataTable data={orders as Payment[]} columns={paymentsColumns} />
				</CardContent>
			</Card>
		</div>
	);
};
