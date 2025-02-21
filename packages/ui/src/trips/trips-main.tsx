"use client"

import React from 'react'
import toast from 'react-hot-toast';
import { DataTable, DataTableLoading } from '../components/data-table';
import { columns } from './trips-columns';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../hooks/use-auth';
import { Booking } from '@instapark/types';
import { TripsDataTable } from './trips-data-table';

const GET_TRIPS = gql`
query GET_TRIPS($userId: String) {
  BookingQuery {
    getBookingsForBuyer(userId: $userId) {
      id
      listingId
      userId
      startDate
      endDate
      status
      listing {
        userId
        type
        country
        state
        district
        city
        street
        pincode
        name
        landmark
        photos
      }
      payments {
        bookingId
        userId
        orderId
        paymentType
        createdAt
        updatedAt
        order {
          cart_details
          cf_order_id
          created_at
          customer_details {
            customer_id
            customer_name
            customer_email
            customer_phone
            customer_uid
          }
          entity
          order_amount
          order_currency
          order_expiry_time
          order_id
          order_meta {
            return_url
            notify_url
            payment_methods
          }
          order_note
          order_splits {
            vendor_id
            amount
            percentage
            tags
          }
          order_status
          order_tags
          payment_session_id
          terminal_data
        }
      }
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
    return <DataTableLoading />
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings: Booking[] = data?.BookingQuery?.getBookingsForBuyer

  return (
    <TripsDataTable columns={columns} data={bookings} />
  )
}
