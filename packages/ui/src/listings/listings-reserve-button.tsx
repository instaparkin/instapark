"use client"

import React from 'react'
import { Button } from '../components/button'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { useAuth } from '../hooks/use-auth'
import { formatName } from '../utils/field-name'
import { Listing } from '../__generated__/graphql'
import { useMutation } from '@apollo/client'
import { CREATE_LOCK } from '../graphql/create-lock'
import { RootState, useSelector } from '@instapark/state'
import { dateToUnixSec } from '../utils/dayjs'
import { uuidToAlphanumeric } from '@instapark/common'

interface ListingReserveButtonProps {
    hostId: string;
    listingId: string;
    basePrice: number
    parkingPrice: number;
    totalPrice: number;
    ipFee: number
}

export const ListingReserveButton = ({ listingId, basePrice, parkingPrice, totalPrice, ipFee, hostId }: ListingReserveButtonProps) => {
    const { firstName, lastName, phoneNumber, userId, emails } = useAuth();
    const { startDate, endDate, vehicleType } = useSelector((state: RootState) => state.search);
    const [createLock] = useMutation(CREATE_LOCK, {
        onCompleted: (data) => {
            const response = data.BookingMutation?.lock
            redirect(`/reserve/${response?.bookingId}?oid=${response?.orderId}&psid=${response?.payment_session_id}&bp=${basePrice}&startDate=${startDate}&endDate=${endDate}`)
        },
        onError: (error) => {
            toast.error(`${error}`);
        }
    });

    const handleReservation = () => {
        createLock({
            variables: {
                listingId,
                userId,
                startDate: dateToUnixSec(new Date(startDate)),
                endDate: dateToUnixSec(new Date(endDate)),
                basePrice: basePrice,
                parkingPrice,
                totalPrice,
                ipFee,
                vehicle: vehicleType,
                customer: {
                    customer_email: emails?.at(0),
                    customer_name: formatName(firstName, lastName),
                    customer_phone: phoneNumber
                },
                vendorId: uuidToAlphanumeric(hostId)
            }
        })
    }

    return (
        <div>
            <Button
                onClick={handleReservation}
                className="w-full my-2"
                size="responsive">
                Reserve Now
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                {"You won't be charged yet"}
            </p>
        </div>
    )
}
