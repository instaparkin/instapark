"use client"

import React, { useEffect, useState } from 'react'
import { NoResults } from '../components/no-results'
import { CiCircleCheck } from 'react-icons/ci'
import { ApiResponse, Booking } from '@instapark/types'
import axios from 'axios'
import { columns } from './hosting-columns'
import { DataTable } from '../components/data-table'
import toast from 'react-hot-toast'

export const HostingUpcoming = () => {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    axios.get<ApiResponse<Booking[]>>(`http://localhost:8085/bookings/all?userId=d045f6ac-35c7-4cfa-afe9-91d5c3f9d7ce&status=upcoming`)
      .then(res => setBookings(res.data.data as Booking[]))
      .catch(error =>
        toast.error(JSON.stringify(error.message))
      )
  }, [])

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
