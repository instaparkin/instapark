"use client"

import React from "react"
import { Card, CardContent } from "../components/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { cn } from "../utils/cn"
import { BikeIcon, Car } from "lucide-react"
import { PiCurrencyCircleDollar } from "react-icons/pi"

type Vehicle = "Bike" | "Cycle" | "Car"

interface PricingCalculatorProps {
  pphbi: number
  pphcy: number
  pphcr: number
  plph: number
  basePrice: number
  instaparkFeePercentage: number
  className?: string
}

export function PricingCalculator({
  pphbi,
  pphcy,
  pphcr,
  plph,
  basePrice,
  instaparkFeePercentage,
  className,
}: PricingCalculatorProps) {
  const [startDate, setStartDate] = React.useState<string>(new Date().toISOString().slice(0, 16))
  const [endDate, setEndDate] = React.useState<string>(new Date(Date.now() + 3600000).toISOString().slice(0, 16))
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle>("Bike")

  const getHourlyRate = (vehicleType: Vehicle) => {
    switch (vehicleType) {
      case "Bike":
        return pphbi
      case "Cycle":
        return pphcy
      case "Car":
        return pphcr
      default:
        return 0
    }
  }

  const calculateDuration = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return (end.getTime() - start.getTime()) / 3600000 // Convert to hours
  }

  const calculateParkingCost = () => {
    const hourlyRate = getHourlyRate(selectedVehicle)
    const hours = calculateDuration()
    return basePrice + hourlyRate * hours
  }

  const calculateInstaparkFee = () => {
    const parkingCost = calculateParkingCost()
    return parkingCost * (instaparkFeePercentage / 100)
  }

  const calculateTotal = () => {
    return calculateParkingCost() + calculateInstaparkFee()
  }

  const vehicleIcons = {
    Car: Car,
    Bike: BikeIcon,
    Cycle: PiCurrencyCircleDollar,
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", "rounded-none md:rounded-lg", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Price Display */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">₹{getHourlyRate(selectedVehicle)}</span>
            <span className="text-muted-foreground">/hour</span>
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-2">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select value={selectedVehicle} onValueChange={(value) => setSelectedVehicle(value as Vehicle)}>
              <SelectTrigger id="vehicle-type">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(vehicleIcons).map((vehicle) => (
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date and Time */}
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date and Time</Label>
            <Input id="end-date" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>Base price</span>
              <span>₹{basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>
                {calculateDuration().toFixed(2)} hours x ₹{getHourlyRate(selectedVehicle)}
              </span>
              <span>₹{(getHourlyRate(selectedVehicle) * calculateDuration()).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Instapark fee ({instaparkFeePercentage}%)</span>
              <span>₹{calculateInstaparkFee().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span>Penalty Per Hour</span>
              <span>₹{plph}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

