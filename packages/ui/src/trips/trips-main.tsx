"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ApiResponse, Booking } from '@instapark/types';
import toast from 'react-hot-toast';
import { DataTable } from '../components/data-table';
import { columns } from './trips-columns';

export const TripsMain = () => {
    const [data, setData] = useState<Booking[]>([])

    useEffect(() => {
        axios.get<ApiResponse<Booking[]>>
            (`http://localhost:8085/bookings/all?userId=bd202289-afd6-4d1b-a36c-9bc43315948b`)
            .then(res => setData(res.data.data as Booking[]))
            .catch(error => {
                toast.error(error.message)
            })
    }, [])

    return (
        <DataTable columns={columns} data={data} />
    )
}
