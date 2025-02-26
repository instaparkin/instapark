"use client"
import React from "react"
import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/input-otp"
import axios from "axios"
import toast from "react-hot-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card"
import { Button } from "../components/button"
import { Form, FormControl, FormField, FormItem } from "../components/form"
import { useQuery } from "@apollo/client"
import Image from "next/image"
import type { BookingExtended } from "@instapark/types/src/Booking"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/dialog"
import { OTPInputForm, OTPInputFormType } from "../forms/otp-input-form"
import { formatLocation, formatPrice } from "../utils/field-name"
import { Details } from "../components/details"
import { unixSecToMonthYearTime } from "../utils/dayjs"
import { HOST_BOOKINGS } from "../graphql/host-bookings"
import { Booking, BookingStatus, HostBooking } from "../__generated__/graphql"
import { UserMini } from "../components/user-mini"
import { OTPDialog } from "../components/otp-dialog"

interface HostingPendingReviewProps {
  userId: string
}

export const HostingPendingReview = ({ userId }: HostingPendingReviewProps) => {
  const { loading, error, data } = useQuery(HOST_BOOKINGS, {
    variables: {
      userId,
      status: BookingStatus.Booked
    }
  })
  const form = OTPInputForm()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error(`Error: ${error.message}`)
  }

  const bookings = data?.ListingQuery?.hostBookings?.bookings as HostBooking[]
  console.log(bookings);


  if (bookings?.length === 0) {
    return (
      <NoResults text="You don't have any guest reviews to write." icon={<CiCircleCheck className="w-10 h-10" />} />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings?.map((b, i) => {
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
                  false)}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-full h-60">
                <Image
                  fill
                  src={(b.listing?.photos[0] as string) || "/placeholder.svg"}
                  alt={"Listing photo"}
                  className="object-cover rounded-md border"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-start">
              <UserMini className="w-full flex justify-center" firstName={b.booking?.user?.firstName as string} lastName={b.booking?.user?.lastName as string} timeJoined={b.booking?.user?.timeJoined as number} />
              <Details
                className="py-4"
                items={[
                  { field: "Start date", value: unixSecToMonthYearTime(b.booking?.startDate as number) },
                  { field: "End date", value: unixSecToMonthYearTime(b.booking?.endDate as number) },
                  { field: "Total price", value: formatPrice(b.booking?.totalPrice as number) },
                  { field: "Estimated earnings", value: formatPrice(b.booking?.totalPrice as number - (b.booking?.ipFee as number)), className: "text-positive" },
                ]} />
              <OTPDialog bookingId={b.booking?.id as string} otp={b.booking?.otp?.otp?.toString() as string} />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

