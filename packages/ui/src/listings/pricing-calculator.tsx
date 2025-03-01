"use client"

import React from "react"
import { Card, CardContent } from "../components/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { cn } from "../utils/cn"
import { Button } from "../components/button"
import { Details, Item } from "../components/details"
import { AppDispatch, RootState, setSearch, useDispatch, useSelector } from "@instapark/state"
import { dateToUnixSec, getStartAndEndDates, unixSecToISO } from "../utils/dayjs"
import { useQuery } from "@apollo/client"
import { PRICING_CALCULATOR } from "../graphql/pricing-calculator"
import { PricingCalculatorSkeleton } from "./pricing-calculator-skeleton"
import { Vehicle } from "../__generated__/graphql"
import { ListingReserveButton } from "./listings-reserve-button"

interface PricingCalculatorProps {
  hostId: string
  listingId: string
  className?: string
}

export function PricingCalculator({ listingId, hostId, className }: PricingCalculatorProps) {
  const { startDate, endDate, vehicleType } = useSelector((state: RootState) => state.search)
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading } = useQuery(PRICING_CALCULATOR, {
    variables: {
      startDate: dateToUnixSec(new Date(startDate as string)),
      endDate: dateToUnixSec(new Date(endDate as string)),
      vehicle: vehicleType,
      id: listingId
    }
  });

  if (loading) {
    return <PricingCalculatorSkeleton />
  }

  const calculator = data?.ListingQuery?.hostListings?.at(0)?.calulator
  return (
    <Card className={cn("w-full rounded-none md:rounded-lg", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Price Display */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{calculator?.hourly}</span>
              <span className="text-muted-foreground">/hour</span>
            </div>
            <ListingReserveButton
              hostId={hostId}
              listingId={listingId}
              basePrice={Number(calculator?.items.find((e) => e?.field === "Base Price")?.value)}
              parkingPrice={Number(calculator?.items.find((e) => e?.field?.includes("hours"))?.value)}
              totalPrice={Number(calculator?.items.find((e) => e?.field === "Total")?.value)}
              ipFee={Number(calculator?.items.find((e) => e?.field === "Instapark Fee (30%)")?.value)}
            />
          </div>
          {/* Vehicle Selection */}
          <div className="space-y-2">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={(value) => {
              if (["Bike", "Cycle", "Car"].includes(value)) {
                dispatch(setSearch({ vehicleType: value as Vehicle }))
              }
            }}
            >
              <SelectTrigger id="vehicle-type">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {calculator?.vehicles?.map((vehicle) => (
                  <SelectItem key={vehicle} value={vehicle}>
                    {vehicle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Date and Time */}
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date and Time</Label>
            <Input
              id="start-date"
              type="datetime-local"
              value={startDate as string}
              onChange={(e) => {
                dispatch(setSearch({ startDate: e.target.value }));
              }}
            />

          </div>

          {/* End Date and Time */}
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date and Time</Label>
            <Input
              id="end-date"
              type="datetime-local"
              value={endDate as string}
              onChange={(e) => dispatch(setSearch({ endDate: e.target.value }))}
            />
          </div>

          {/* Price Breakdown */}
          <Details items={calculator?.items as Item[]} />
        </div>
      </CardContent>
    </Card>
  )
}

