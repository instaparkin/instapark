"use client"

import React from "react";
import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { unixSecToMonthYearTime } from "../utils/dayjs";
import { gql, useQuery } from "@apollo/client";
import { Booking } from "@instapark/types";

const GET_CHECKINGOUT_BOOKINGS = gql`
query GET_CHECKINGOUT_BOOKINGS {
  BookingQuery {
    getBookingsForHost(status: OnGoing) {
      id
      listingId
      userId
      startDate
      endDate
      status
      lockedAt
      createdAt
      updatedAt
    }
  }
}
`

export const HostingCurrent = () => {
  const { loading, error, data } = useQuery(GET_CHECKINGOUT_BOOKINGS);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings = data.BookingQuery.getBookingsForHost;

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