"use client"

import React, { useEffect, useState } from 'react'
import { NoResults } from '../components/no-results'
import { CiCircleCheck } from 'react-icons/ci'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/input-otp"
import axios from 'axios'
import { ApiResponse, Booking } from '@instapark/types'
import toast from 'react-hot-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card'
import { Button } from '../components/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../components/form'
import { OTPInputForm, OTPInputFormType } from '../forms/otp-input-form'
import { gql, useQuery } from '@apollo/client'

const GET_REVIEW_BOOKINGS = gql`
query GET_REVIEW_BOOKINGS {
  BookingQuery {
    getBookingsForHost(status: Booked) {
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

export const HostingPendingReview = () => {
  const { loading, error, data } = useQuery(GET_REVIEW_BOOKINGS);
  const form = OTPInputForm()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error(`Error: ${error.message}`);
  }

  const bookings = data.BookingQuery.getBookingsForHost

  if (bookings.length === 0) {
    return (
      <NoResults
        text="You don't have any guest reviews to write."
        icon={<CiCircleCheck className="w-10 h-10" />}
      />
    )
  }

  function onSubmit(bookingId: string, data: OTPInputFormType) {
    axios.post(`http://localhost:8085/bookings/otp/verify`, {
      bookingId,
      otp: data.otp,
    }).then(res => {
      toast.success(res.data.message)
    }).catch(error => {
      toast.error(error.message)
    })
  }

  return (
    <div>
      {
        bookings.map((b: Booking) => (
          <Card key={b.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((e) => onSubmit(b.id, e))} className="w-2/3 space-y-6">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          Please enter the one-time password sent to your phone.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
}
