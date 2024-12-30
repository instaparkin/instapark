'use client'

import { useState, VideoHTMLAttributes } from 'react'
import { Button } from "../components/button"
import { Card, CardContent, CardFooter } from "../components/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { type Vehicle } from '@instapark/types'
import { cn } from '../utils/cn'
import { BikeIcon, Car } from 'lucide-react'
import { PiCurrencyCircleDollar } from 'react-icons/pi'

interface PricingCalculatorProps {
    pphbi: number
    pphcy: number
    pphcr: number
    plph: number
    basePrice: number
    className?: string
}

export function PricingCalculator({
    pphbi,
    pphcy,
    pphcr,
    plph,
    basePrice,
    className
}: PricingCalculatorProps) {
    const [durationUnit, setDurationUnit] = useState<'hours' | 'days'>('hours')
    const [durationValue, setDurationValue] = useState<number>(1)
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>()

    const getHourlyRate = (vehicleType: string) => {
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

    const calculateTotal = () => {
        const hourlyRate = getHourlyRate(selectedVehicle as Vehicle)
        const hours = durationUnit === 'days' ? durationValue * 24 : durationValue
        const baseAmount = basePrice + (hourlyRate * hours)
        return baseAmount
    }

    const calculatePenalty = () => {
        const hours = durationUnit === 'days' ? durationValue * 24 : durationValue
        return plph * hours
    }
    const vehicleIcons = {
        Car: Car,
        Bike: BikeIcon,
        Cycle: PiCurrencyCircleDollar,
    };
    return (
        <Card className={cn(
            "w-full max-w-md mx-auto",
            "rounded-none md:rounded-lg",
            className
        )}>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {/* Price Display */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">₹{getHourlyRate(selectedVehicle as Vehicle)}</span>
                        <span className="text-muted-foreground">/hour</span>
                    </div>

                    {/* Vehicle Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                        <Select
                            value={selectedVehicle as Vehicle}
                            onValueChange={(value) => setSelectedVehicle(value as Vehicle)}
                        >
                            <SelectTrigger id="vehicle-type">
                                <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(vehicleIcons).map((vehicle) => (
                                    <SelectItem key={vehicle} value={vehicle}>
                                        {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Duration Unit Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="duration-unit">Duration Unit</Label>
                        <Select
                            value={durationUnit}
                            onValueChange={(value) => setDurationUnit(value as 'hours' | 'days')}
                        >
                            <SelectTrigger id="duration-unit">
                                <SelectValue placeholder="Select duration unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Duration Value Input */}
                    <div className="space-y-2">
                        <Label htmlFor="duration-value">Duration ({durationUnit})</Label>
                        <Input
                            id="duration-value"
                            type="number"
                            min="1"
                            value={durationValue}
                            onChange={(e) => setDurationValue(Math.max(1, parseInt(e.target.value) || 1))}
                            placeholder={`Enter number of ${durationUnit}`}
                        />
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between">
                            <span>Base price</span>
                            <span>₹{basePrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{durationValue} {durationUnit} x ₹{getHourlyRate(selectedVehicle)}{durationUnit === 'days' ? ' x 24' : ''}</span>
                            <span>₹{getHourlyRate(selectedVehicle) * (durationUnit === 'days' ? durationValue * 24 : durationValue)}</span>
                        </div>
                        <div className="flex justify-between text-destructive">
                            <span>Potential penalty fee</span>
                            <span>₹{calculatePenalty()}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col px-6 pb-6">
                <Button
                    className="w-full"
                    size="lg"
                >
                    Reserve Now
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-2">
                    You won't be charged yet
                </p>
            </CardFooter>
        </Card>
    )
}

