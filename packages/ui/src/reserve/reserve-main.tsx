"use client"

import { redirect, useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import { useAuth } from '../hooks/use-auth';
import { useMutation } from '@apollo/client';
import { Details } from '../components/details';
import { dateToUnixSec, unixSecToMonthYearTime } from '../utils/dayjs';
import { formatPrice } from '../utils/field-name';
import { PaymentButton } from '../components/payment-button';
import { Checkmark } from '../components/checkmark';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/dialog';
import { CREATE_BOOK } from '../graphql/create-book';

export const ReserveMain = () => {
    const { userId } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState<JSX.Element | null>(null);
    const searchParams = useSearchParams();
    const { id: bookingId } = useParams()
    const orderId = searchParams.get("oid");
    const payment_session_id = searchParams.get("psid");
    const basePrice = searchParams.get("bp");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const [createBooking] = useMutation(CREATE_BOOK, {
        onCompleted: (data) => {
            setDialogMessage(
                <div className="flex flex-col items-center gap-2">
                    <Checkmark size={80} color="green" />
                    <DialogDescription className="text-center text-green-600">
                        {data.BookingMutation?.book}
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
                                bookingId: bookingId as string,
                                orderId,
                                userId
                            }
                        })
                    }} />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="hidden">Open</DialogTrigger>
                <DialogContent
                    onClose={() => {
                        redirect(`/trips/${bookingId}`)
                    }}
                    className="flex flex-col items-center gap-4">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-center mb-4">Status</DialogTitle>
                        {dialogMessage}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
