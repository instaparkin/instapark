'use client';

import { useMutation } from '@apollo/client';
import React from 'react';
import { COMPLETE_ORDER } from '../graphql/complete-order';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../components/button';
import { useAuth } from '../hooks/use-auth';
import { formatName } from '../utils/field-name';
import { uuidToAlphanumeric } from '@instapark/common';

interface CompleteOrderButtonProps {
	bookingId: string;
	hostId: string;
	listingId: string;
	basePrice: number;
	parkingPrice: number;
	totalPrice: number;
	ipFee: number;
}

export const CompleteOrderButton = ({
	hostId,
	listingId,
	bookingId,
	basePrice,
	parkingPrice,
	totalPrice,
	ipFee,
}: CompleteOrderButtonProps) => {
	const { userId, email, firstName, lastName, phoneNumber } = useAuth();
	const [completeOrder] = useMutation(COMPLETE_ORDER, {
		onCompleted: (data) => {
			const response = data.BookingMutation?.completeOrder;
			console.log(response);
			redirect(
				`/complete/${response?.bookingId}?oid=${response?.orderId}&psid=${response?.payment_session_id}&bid=${bookingId}`,
			);
		},
		onError: (error) => {
			toast.error(`${error}`);
		},
	});
	const handleCompleteOrder = () => {
		completeOrder({
			variables: {
				bookingId,
				listingId,
				userId,
				basePrice,
				parkingPrice,
				totalPrice,
				ipFee,
				customer: {
					customer_email: email,
					customer_name: formatName(firstName, lastName),
					customer_phone: phoneNumber,
				},
				vendorId: uuidToAlphanumeric(hostId),
			},
		});
	};
	return (
		<Button onClick={handleCompleteOrder} size={'responsive'}>
			Complete
		</Button>
	);
};
