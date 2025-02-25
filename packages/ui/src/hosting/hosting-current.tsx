"use client"

import React from "react";
import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci";
import toast from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";
import { HOST_BOOKINGS } from "../graphql/host-bookings";
import { useAuth } from "../hooks/use-auth";
import { Booking, BookingStatus, HostBooking } from "../__generated__/graphql";

export const HostingCurrent = () => {
  const { userId } = useAuth();
  const { loading, error, data } = useQuery(HOST_BOOKINGS, {
    variables: {
      userId,
      status: BookingStatus.OnGoing
    },
  });

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings = data?.ListingQuery?.hostBookings?.bookings as HostBooking[];

  console.log(bookings);

  if (bookings.length === 0) {
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
    <div></div>
  )
}