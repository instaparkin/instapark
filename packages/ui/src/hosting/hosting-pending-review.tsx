'use client';
import React from 'react';
import { NoResults } from '../components/no-results';
import { CiCircleCheck } from 'react-icons/ci';
import toast from 'react-hot-toast';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/card';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { OTPInputForm } from '../forms/otp-input-form';
import { formatLocation, formatPrice } from '../utils/field-name';
import { Details } from '../components/details';
import { unixSecToMonthYearTime } from '../utils/dayjs';
import { HOST_BOOKINGS } from '../graphql/host-bookings';
import { BookingStatus, HostBooking } from '../__generated__/graphql';
import { UserMini } from '../components/user-mini';
import { OTPDialog } from '../components/otp-dialog';
import { useAuth } from '../hooks/use-auth';

export const HostingPendingReview = () => {
	const { userId } = useAuth();
	const { loading, error, data } = useQuery(HOST_BOOKINGS, {
		variables: {
			userId,
			status: BookingStatus.Booked,
		},
	});
	const form = OTPInputForm();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		toast.error(`Error: ${error.message}`);
	}

	const bookings = data?.ListingQuery?.hostBookings?.bookings as HostBooking[];
	console.log(bookings);

	if (bookings?.length === 0) {
		return (
			<NoResults
				text="You don't have any guest reviews to write."
				icon={<CiCircleCheck className="h-10 w-10" />}
			/>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{bookings &&
				bookings?.map((b, i) => {
					return (
						<Card key={i} className="w-full">
							<CardHeader>
								<CardTitle className="text-lg">
									{formatLocation(
										b.listing?.country,
										b.listing?.state,
										b.listing?.district,
										b.listing?.city,
										b.listing?.street,
										b.listing?.pincode,
										false,
									)}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col items-center">
								<div className="relative h-60 w-full">
									<Image
										fill
										src={(b.listing?.photos[0] as string) || '/placeholder.svg'}
										alt={'Listing photo'}
										className="rounded-md border object-cover"
									/>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col justify-start">
								<UserMini
									className="flex w-full justify-center"
									firstName={b.booking?.user?.firstName as string}
									lastName={b.booking?.user?.lastName as string}
									timeJoined={b.booking?.user?.timeJoined as number}
								/>
								<Details
									className="py-4"
									items={[
										{
											field: 'Start date',
											value: unixSecToMonthYearTime(
												b.booking?.startDate as number,
											),
										},
										{
											field: 'End date',
											value: unixSecToMonthYearTime(
												b.booking?.endDate as number,
											),
										},
										{
											field: 'Total price',
											value: formatPrice(b.booking?.totalPrice as number),
										},
										{
											field: 'Estimated earnings',
											value: formatPrice(
												(
													(b.booking?.totalPrice as number) -
													(b.booking?.ipFee as number)
												).toFixed(2),
											),
											className: 'text-positive',
										},
									]}
								/>
								<OTPDialog bookingId={b.booking?.id as string} form={form} />
							</CardFooter>
						</Card>
					);
				})}
		</div>
	);
};
