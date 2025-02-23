"use client"

import React from 'react'
import toast from 'react-hot-toast';
import { DataTableLoading } from '../components/data-table';
import { columns } from './trips-columns';
import { useQuery } from '@apollo/client';
import { useAuth } from '../hooks/use-auth';
import { TripsDataTable } from './trips-data-table';
import { gql } from '../__generated__';
import { GET_TRIPS } from '../graphql/get-trips';



export const TripsMain = () => {
  const { userId } = useAuth();

  const { loading, error, data } = useQuery(GET_TRIPS, {
    variables: { userId }
  });

  if (loading) {
    return <DataTableLoading />
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings = data?.BookingQuery?.getBookingsForBuyer

  return (
    <TripsDataTable columns={columns} data={bookings} />
  )
}
