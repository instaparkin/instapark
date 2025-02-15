import React from 'react'
import { Button } from '../components/button'
import axios from 'axios'
import { ApiResponse, Booking, BookingRequest } from '@instapark/types'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export const ListingReserve = ({ listingId, userId, startDate, endDate }: BookingRequest) => {

    const handleReservation = async () => {
        await axios.post<ApiResponse<Booking>>("http://localhost:8085/bookings/lock", {
            listingId,
            userId,
            startDate,
            endDate,
        }).then( res => {
            if (res.data.status === "SUCCESS") {
                console.log(res.data.data);
                
                redirect(`/reserve/${res.data.data.c?.id}?oid=${res.data.data.orderId}&psid=${res.data.data.payment_session_id}`)
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
