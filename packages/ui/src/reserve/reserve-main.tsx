"use client"

import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'
import { useAuth } from '../hooks/use-auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TRIP_DETAILED } from '../graphql/get-trip-detailed';
import { Details } from '../components/details';
import { dateToUnixSec, unixSecToMonthYearTime } from '../utils/dayjs';
import { formatPrice } from '../utils/field-name';
import { PaymentButton } from '../components/payment-button';
import { COMPLETE } from '../graphql/complete';
import { Checkmark } from '../components/checkmark';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/dialog';
import { CREATE_BOOK } from '../graphql/create-book';

export const ReserveMain = () => {
    const { userId } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState<JSX.Element | null>(null);
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bid");
    const orderId = searchParams.get("oid");
    const payment_session_id = searchParams.get("psid");
    const basePrice = searchParams.get("bp");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const { data } = useQuery(GET_TRIP_DETAILED, {
        variables: {
            userId,
            id: bookingId as string
        },
    })
    const [createBooking] = useMutation(CREATE_BOOK, {
        onCompleted: () => {
            setDialogMessage(
                <div className="flex flex-col items-center gap-2">
                    <Checkmark size={80} color="green" />
                    <DialogDescription className="text-center text-green-600">
                        Listing created successfully!
                    </DialogDescription>
                </div>
            );
            setIsDialogOpen(true);
        },
        onError: (err) => {
            setDialogMessage(
                <DialogDescription className="text-center text-red-600">
                    Error: {err.message}
                </DialogDescription>
            );
            setIsDialogOpen(true);
        },
    })
    return (
        <div className='max-w-lg mx-auto'>
            <Details items={[
                { field: "Start Date", value: unixSecToMonthYearTime(dateToUnixSec(new Date(startDate as unknown as number))) },
                { field: "End Date", value: unixSecToMonthYearTime(dateToUnixSec(new Date(endDate as unknown as number))) },
                { field: "Base Price", value: formatPrice(basePrice as unknown as number) },
            ]} />
            <PaymentButton
                amount={formatPrice(basePrice as unknown as number)}
                orderId={orderId as string}
                paymentSessionId={payment_session_id as string}
                onPayment={
                    (_, orderId) => {
                        createBooking({
                            variables: {
                                bookingId,
                                orderId,
                                userId
                            }
                        })
                        redirect(`/trips/${bookingId}`)
                    }} />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} o >
                <DialogTrigger className="hidden">Open</DialogTrigger>
                <DialogContent className="flex flex-col items-center gap-4">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-center mb-4">Status</DialogTitle>
                        {dialogMessage}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
