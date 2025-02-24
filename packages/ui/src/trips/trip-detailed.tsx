"use client"

import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { DataTable, DataTableLoading } from '../components/data-table'
import { Booking, Listing, Order, Payment, Profile } from '@instapark/types'
import { paymentsColumns } from './payments-column'
import { Details } from '../components/details'
import { timeInInstapark, unixSecToMonthYearTime } from '../utils/dayjs'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'
import Image from 'next/image'
import { formatName, formatPrice } from '../utils/field-name'
import { ListingMini } from '../components/listing-mini'
import { useAuth } from '../hooks/use-auth'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

const GET_TRIP = gql`
query GET_TRIP($id: String, $userId: String) {
  BookingQuery {
    getBookingsForBuyer(id: $id, userId: $userId) {
      id
      listingId
      userId
      startDate
      endDate
      status
      lockedAt
      ipFee
      basePrice
      totalPrice
      parkingPrice
      createdAt
      updatedAt
      listing {
        userId
        type
        country
        state
        district
        city
        street
        pincode
        latitude
        longitude
        name
        landmark
        allowedVehicles
        basePrice
        pphbi
        pphcy
        pphcr
        plph
        photos
        id
        isOpen
        rating
            user {
          userId
          firstName
          lastName
          emails
          timeJoined
          phoneNumber
          kyc {
            uidai
            verified
          }
          country
          state
          district
          city
          street
          pincode
          latitude
          longitude
          name
          landmark
          ratings
          reviews
        }
        createdAt
        updatedAt
      }
      payments {
        bookingId
        userId
        orderId
        paymentType
        createdAt
        updatedAt
        order {
          cart_details
          cf_order_id
          created_at
          customer_details {
            customer_id
            customer_name
            customer_email
            customer_phone
            customer_uid
          }
          entity
          order_amount
          order_currency
          order_expiry_time
          order_id
          order_meta {
            return_url
            notify_url
            payment_methods
          }
          order_note
          order_splits {
            vendor_id
            amount
            percentage
            tags
          }
          order_status
          order_tags
          payment_session_id
          terminal_data
        }
      }

    }
  }
}
`

export const TripDetailed = ({ id }: { id: string }) => {
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(GET_TRIP, {
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
  
  const booking = data?.BookingQuery?.getBookingsForBuyer[0] as Booking & { listing: Listing & { user: Profile }, payments: Payment & { order: Order }[] };
  const listing = booking.listing
  const orders = booking.payments
  const host = booking.listing.user
  return (
    <div className="max-w-5xl mx-auto space-y-6 ">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{"Host Summary"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative w-36 h-36">
                <Image
                  fill
                  src={"/placeholder.svg"}
                  alt={"Listing photo"}
                  className="object-cover rounded-md border"
                />
              </div>
              <Details items={[
                { field: "Name", value: formatName(host.firstName, host.lastName) },
                { field: "Reviews", value: host.reviews },
                { field: "Ratings", value: host.ratings },
                { field: "Experience", value: timeInInstapark(host.timeJoined) },
                { field: "Verified", value: host.kyc.verified ? "Verified" : "Not verified", className: `${host.kyc.verified ? "bg-lime-100" : "bg-red-100"}` },
              ]} />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full lg:max-w-md">
          <CardHeader>
            <CardTitle>{"Booking Summary"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <ListingMini listing={listing} />
              <Details items={[
                { field: "Start Date", value: unixSecToMonthYearTime(booking.startDate) },
                { field: "End Date", value: unixSecToMonthYearTime(booking.endDate) },
                { field: "Base Price", value: formatPrice(booking.basePrice) },
                { field: "Instapark Fee", value: formatPrice(booking.ipFee) },
                { field: "Parking Price", value: formatPrice(booking.parkingPrice) },
                { field: "Total Price", value: formatPrice(booking.totalPrice), separator: true },
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
          <DataTable data={orders} columns={paymentsColumns} />
        </CardContent>
      </Card>
    </div>
  )
}
