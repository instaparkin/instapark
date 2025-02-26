"use client"

import React from 'react'
import { NoResults } from '../components/no-results'
import { CiCircleCheck } from 'react-icons/ci'
import { columns } from './hosting-columns'
import { DataTable, DataTableLoading } from '../components/data-table'
import toast from 'react-hot-toast'
import { useQuery } from '@apollo/client'
import { HOST_BOOKINGS } from '../graphql/host-bookings'
import { HostBooking, BookingStatus, HostBookings } from '../__generated__/graphql'
import { useAuth } from '../hooks/use-auth'

export const HostingCompleted = () => {
  const { userId } = useAuth()
  const { loading, error, data } = useQuery(HOST_BOOKINGS, {
    variables: {
      userId,
      status: BookingStatus.Completed
    }
  });

  if (loading) {
    return <DataTableLoading />
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings = data?.ListingQuery?.hostBookings?.bookings

  console.log(bookings);


  if (bookings?.length === 0) {
    return (
      <NoResults
        text="You don't have any guests arriving today or tomorrow."
        icon={<CiCircleCheck className="w-10 h-10" />}
      />
    )
  }

  return (
    <div>
      <DataTable columns={columns} data={bookings as HostBooking[]} />
    </div>
  )
}
