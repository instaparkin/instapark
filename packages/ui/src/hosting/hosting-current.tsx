"use client"

import React from "react";
import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci";
import toast from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";
import { HOST_BOOKINGS } from "../graphql/host-bookings";
import { useAuth } from "../hooks/use-auth";
import { Booking, BookingStatus, HostBooking, Listing, Payment } from "../__generated__/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { ListingMini } from "../components/listing-mini";
import { unixSecToMonthYearTime } from "../utils/dayjs";
import { formatPrice } from "../utils/field-name";
import { Details } from "../components/details";
import { DataTable, DataTableLoading } from "../components/data-table";
import { paymentsColumns } from "../trips/payments-column";
import { Button } from "../components/button";
import { UserMini } from "../components/user-mini";

export const HostingCurrent = () => {
  const { userId } = useAuth();
  const { loading, error, data } = useQuery(HOST_BOOKINGS, {
    variables: {
      userId,
      status: BookingStatus.OnGoing
    },
  });
  const bookings = data?.ListingQuery?.hostBookings?.bookings as HostBooking[];
  const booking = bookings?.at(0)?.booking;
  const orders = booking?.payments as Payment[]

  if (loading) {
    return <DataTableLoading />
  }

  if (error) {
    toast.error(`${error}`)
  }

  if (bookings?.length === 0) {
    return (
      <NoResults
        text="You don't have any guests checking out today or tomorrow."
        icon={<CiCircleCheck className="w-10 h-10" />}
      />
    )
  }

  /**
   * TODO
   * 1. Hosting Current Page
   */
  return (
    <div className="max-w-5xl mx-auto space-y-6 ">
      <div className="flex items-center justify-between">
        <ListingMini listing={bookings?.at(0)?.listing as Listing} />
      </div>
      <UserMini firstName={booking?.user?.firstName as string} lastName={booking?.user?.lastName as string} timeJoined={booking?.user?.timeJoined as number} className="w-full" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{"Booking Summary"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <Details className="w-full grid grid-cols-1" items={[
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