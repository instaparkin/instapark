"use client"

import React, { useActionState, useEffect, useState } from "react"
import { CiCircleCheck } from "react-icons/ci"
import { NoResults } from "../components/no-results"
import axios from "axios"
import { ApiResponse, Booking } from "@instapark/types"
import { useAuth } from "../hooks/use-auth"
import { DataTable } from "../components/data-table"
import { columns } from "./hosting-columns"

export const HostingArrivingSoon = () => {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    axios.get<ApiResponse<Booking[]>>(`http://localhost:8085/bookings/all?userId=d045f6ac-35c7-4cfa-afe9-91d5c3f9d7ce`)
      .then(res => setBookings(res.data.data as Booking[]))
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
