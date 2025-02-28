"use client"

import { useQuery } from '@apollo/client'
import React from 'react'
import { DataTable, DataTableLoading } from '../components/data-table'
import { paymentsColumns } from './payments-column'
import { Details } from '../components/details'
import { unixSecToMonthYearTime } from '../utils/dayjs'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'
import { formatPrice } from '../utils/field-name'
import { useAuth } from '../hooks/use-auth'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { GET_TRIP_DETAILED } from '../graphql/get-trip-detailed'
import { Listing, Payment } from '../__generated__/graphql'
import { UserMini } from '../components/user-mini'
import { ListingMini } from '../components/listing-mini'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../components/input-otp'
import { generateGoogleMapsLink } from '@instapark/common'
import Link from 'next/link'
import { Button } from '../components/button'

export const TripDetailed = ({ id }: { id: string }) => {
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(GET_TRIP_DETAILED, {
    variables: {
      id,
      userId
    }
  })
  if (loading) {
    return <DataTableLoading />
  }

  if (error) {
    toast.error(`${error}`)
    redirect("/trips")
  }

  const booking = data?.BookingQuery?.buyerBookings?.at(0)?.booking;
  const orders = booking?.payments
  const listing = data?.BookingQuery?.buyerBookings?.at(0)?.listing
  const host = listing?.user;
  const otp = booking?.otp?.otp;

  const CheckInDetails = [
    {
      name: "Host",
      content: () => (
        <UserMini
          className='border-none'
          host={true}
          firstName={host?.firstName as string}
          lastName={host?.lastName as string}
          timeJoined={host?.timeJoined as number} />
      )
    },
    {
      name: "OTP",
      content: () => (
        <InputOTP maxLength={6} defaultValue={otp?.toString()} readOnly
          className='flex flex-col'>
          <InputOTPGroup>
            <InputOTPSlot defaultValue={otp?.toString().at(0)} index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )
    },
    {
      name: "Location",
      content: () => (
        <Button asChild variant={"link"} className='p-0 line-clamp-3'>
          <Link
            className='text-blue-500 text-wrap'
            target="_blank"
            href={
              generateGoogleMapsLink(
                listing?.latitude as number,
                listing?.longitude as number,
              )}>
            {generateGoogleMapsLink(
              listing?.latitude as number,
              listing?.longitude as number,
            )}
          </Link>
        </Button>
      )
    }
  ]
  return (
    <div className="max-w-5xl mx-auto space-y-6 ">
      <div className='flex items-center justify-between border bg-white dark:bg-black p-6 rounded-sm'>
        <h2 className='text-xl font-semibold'>Final Payment</h2>
        <Button>Complete</Button>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{"Check-In Details"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {
              CheckInDetails.map((c, i) => (
                <div key={i} className='space-y-4'>
                  <h2 className='text-muted-foreground font-semibold'>{c.name}</h2>
                  {<c.content />}
                </div>
              ))
            }
          </CardContent>
        </Card>
        <Card className="w-full lg:max-w-md">
          <CardHeader>
            <CardTitle>{"Booking Summary"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <ListingMini listing={listing as Listing} />
              <Details items={[
                { field: "Start Date", value: unixSecToMonthYearTime(booking?.startDate as number) },
                { field: "End Date", value: unixSecToMonthYearTime(booking?.endDate as number) },
                { field: "Base Price", value: formatPrice(booking?.basePrice as number) },
                { field: "Instapark Fee", value: formatPrice(booking?.ipFee as number) },
                { field: "Parking Price", value: formatPrice(booking?.parkingPrice as number) },
                { field: "Total Price", value: formatPrice(booking?.totalPrice as number), separator: true },
              ]} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={orders as Payment[]} columns={paymentsColumns} />
        </CardContent>
      </Card>
    </div>
  )
}
