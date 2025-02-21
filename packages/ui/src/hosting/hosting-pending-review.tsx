"use client"
import React from "react"
import { NoResults } from "../components/no-results"
import { CiCircleCheck } from "react-icons/ci"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/input-otp"
import axios from "axios"
import toast from "react-hot-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card"
import { Button } from "../components/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../components/form"
import { useQuery } from "@apollo/client"
import Image from "next/image"
import type { BookingExtended } from "@instapark/types/src/Booking"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/dialog"
import { GET_REVIEW_BOOKINGS } from "../graphql/get-review-bookings"
import { OTPInputForm, OTPInputFormType } from "../forms/otp-input-form"
import { formatLocation } from "../utils/field-name"
import { Details } from "../components/details"
import { unixSecToMonthYearTime } from "../utils/dayjs"

export const HostingPendingReview = () => {
  const { loading, error, data } = useQuery(GET_REVIEW_BOOKINGS)
  const form = OTPInputForm()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    toast.error(`Error: ${error.message}`)
  }

  const bookings = data?.BookingQuery?.getBookingsForHost || []

  if (bookings.length === 0) {
    return (
      <NoResults text="You don't have any guest reviews to write." icon={<CiCircleCheck className="w-10 h-10" />} />
    )
  }

  function onSubmit(bookingId: string, data: OTPInputFormType) {
    axios
      .post(`http://localhost:8085/bookings/otp/verify`, {
        bookingId,
        otp: data.otp,
      })
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((b: BookingExtended) => {
        const listing = b.listing;
        console.log(listing);

        return (
          <Card key={b.id} className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">
                {formatLocation(
                  listing.country,
                  listing.state,
                  listing.district,
                  listing.city,
                  listing.street,
                  listing.pincode,
                  false)}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-full h-60">
                <Image
                  fill
                  src={(b.listing.photos[0] as string) || "/placeholder.svg"}
                  alt={"Listing photo"}
                  className="object-cover rounded-md border"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-start bg-muted">
              <Details
              className="py-4"
                items={[
                  { field: "Start Date", value: unixSecToMonthYearTime(b.startDate) },
                  { field: "End Date", value: unixSecToMonthYearTime(b.endDate) },
                ]} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full py-6" size={"lg"}>Approve</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Enter OTP to Approve</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((e) => onSubmit(b.id, e))} className="space-y-6">
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
                            <FormDescription>Please enter the one-time password sent to your phone.</FormDescription>
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

