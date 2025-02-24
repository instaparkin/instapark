import React from 'react'
import { Button } from '../components/button'
import axios from 'axios'
import { ApiResponse, BookingRequest, LockedResponse } from '@instapark/types'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export const ListingReserve = ({ listingId, userId, startDate, endDate, basePrice, parkingPrice, totalPrice, ipFee }: BookingRequest) => {
    const handleReservation = async () => {
        await axios.post<ApiResponse<LockedResponse>>("http://localhost:8085/bookings/lock", {
            listingId,
            userId,
            startDate,
            endDate,
            basePrice,
            totalPrice,
            parkingPrice,
            ipFee
        }).then(res => {
            if (res.data.status === "SUCCESS") {
                redirect(`/reserve/${res.data.data?.booking.id}?oid=${res.data.data?.orderId}&psid=${res.data.data?.payment_session_id}`)
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
