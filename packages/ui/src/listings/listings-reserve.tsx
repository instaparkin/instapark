"use client"

import React from 'react'
import { Button } from '../components/button'
import axios from 'axios'
import { ApiResponse, BookingRequest, LockedResponse } from '@instapark/types'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { useAuth } from '../hooks/use-auth'
import { formatName } from '../utils/field-name'
import { Booking, Listing } from '../__generated__/graphql'

export const ListingReserve = (listing: Listing) => {
    const { firstName, lastName, phoneNumber, userId, emails } = useAuth();
    const handleReservation = async () => {
        await axios.post<ApiResponse<LockedResponse>>("http://localhost:8085/bookings/lock", {
            listingId: listing.id,
            userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            basePrice,
            totalPrice,
            parkingPrice,
            ipFee,
            vehicle,
            customer: {
                "customer_id": userId,
                "customer_name": formatName(firstName, lastName),
                "customer_email": emails?.at(0),
                "customer_phone": phoneNumber
            },
            vendor_id:
        }).then(res => {
                if (res.data.status === "SUCCESS") {
                    redirect(`/reserve/${res.data.data?.bookingId}?oid=${res.data.data?.orderId}&psid=${res.data.data?.payment_session_id}`)
                } else {
                    toast.error(res.data.message)
                }
            })
    }

    return (
        <div>
            <Button
                onClick={handleReservation}
                className="w-full my-2"
                size="lg"
            >
                Reserve Now
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                {"You won't be charged yet"}
            </p>
        </div>
    )
}
