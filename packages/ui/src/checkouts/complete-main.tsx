"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useAuth } from '../hooks/use-auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TRIP_DETAILED } from '../graphql/get-trip-detailed';
import { Details } from '../components/details';
import { unixSecToMonthYearTime } from '../utils/dayjs';
import { formatPrice } from '../utils/field-name';
import { PaymentButton } from '../components/payment-button';
import { COMPLETE } from '../graphql/complete';
import { Checkmark } from '../components/checkmark';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/dialog';

export const CompleteMain = () => {
    const { userId } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState<JSX.Element | null>(null);
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bid");
    const orderId = searchParams.get("oid");
    const payment_session_id = searchParams.get("psid");
    const { data } = useQuery(GET_TRIP_DETAILED, {
        variables: {
            userId,
            id: bookingId as string
        }
    })
    const booking = data?.BookingQuery?.buyerBookings?.at(0)?.booking;
    const [complete] = useMutation(COMPLETE, {
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
                { field: "Start Date", value: unixSecToMonthYearTime(booking?.startDate as number) },
                { field: "End Date", value: unixSecToMonthYearTime(booking?.endDate as number) },
                { field: "Base Price", value: formatPrice(booking?.basePrice as number) },
                { field: "Instapark Fee", value: formatPrice(booking?.ipFee as number) },
                { field: "Parking Price", value: formatPrice(booking?.parkingPrice as number) },
                { field: "Total Price", value: formatPrice(booking?.totalPrice as number), separator: true },
            ]} />
            <PaymentButton
                amount={formatPrice((booking?.totalPrice as number) - (booking?.basePrice as number))}
                orderId={orderId as string}
                paymentSessionId={payment_session_id as string}
                onPayment={
                    (result, orderId) => {
                        complete({
                            variables: {
                                bookingId,
                                orderId,
                                userId
                            }
                        })
                    }} />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
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
