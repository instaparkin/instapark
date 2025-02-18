"use client"

import React from 'react'
import toast from 'react-hot-toast';
import { DataTable } from '../components/data-table';
import { columns } from './trips-columns';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../hooks/use-auth';
import { Booking } from '@instapark/types';

const GET_TRIPS = gql`
query GET_TRIPS($userId: String!) {
  BookingQuery {
    getBookingsForBuyer(userId: $userId) {
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

export const TripsMain = () => {
    const { userId } = useAuth();

    const { loading, error, data } = useQuery(GET_TRIPS, {
        variables: { userId }
    });

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        toast.error(`Error: ${error.message}`);
    }

    const bookings: Booking[] = data?.BookingQuery?.getBookingsForBuyer

    return (
        <DataTable columns={columns} data={bookings} />
    )
}
