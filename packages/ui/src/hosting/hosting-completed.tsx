"use client"

import React from 'react'
import { NoResults } from '../components/no-results'
import { CiCircleCheck } from 'react-icons/ci'
import { columns } from './hosting-columns'
import { DataTable } from '../components/data-table'
import toast from 'react-hot-toast'
import { gql, useQuery } from '@apollo/client'
import { Booking } from '@instapark/types'

const GET_COMPLETED_BOOKINGS = gql`
query GET_COMPLETED_BOOKINGS {
  BookingQuery {
    getBookingsForHost(status: Completed) {
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


export const HostingCompleted = () => {
  const { loading, error, data } = useQuery(GET_COMPLETED_BOOKINGS);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings: Booking[] = data.BookingQuery.getBookingsForHost

  if (bookings.length === 0) {
    return (
      <NoResults
        text="You don't have any guests arriving today or tomorrow."
        icon={<CiCircleCheck className="w-10 h-10" />}
      />
    )
  }

  return (
    <div>
      <DataTable columns={columns} data={bookings} />
    </div>
  )
}
