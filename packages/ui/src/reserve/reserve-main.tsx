import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "../components/alert"

interface BookingConfirmationProps {
    dates: {
        checkIn: string
        checkOut: string
    }
    guestCount: number
    property: {
        name: string
        type: string
        image: string
    }
    pricing: {
        nightlyRate: number
        nights: number
        serviceFee: number
        taxes: number
    }
}

export function CheckoutConfirm({
    dates = {
        checkIn: "28 Feb",
        checkOut: "5 Mar",
    },
    property = {
        name: "Moon Villa",
        type: "Entire guest house",
        image: "",
    },
    pricing = {
        nightlyRate: 13140,
        nights: 5,
        serviceFee: 9275.33,
        taxes: 11826,
    },
}: BookingConfirmationProps) {
    const subtotal = pricing.nightlyRate * pricing.nights
    const total = subtotal + pricing.serviceFee + pricing.taxes

    return (
        <div className="max-w-7xl mx-auto">

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Trip Details */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">Your trip</h2>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">Start Date</h3>
                                <p className="text-gray-600">
                                    {dates.checkIn} – {dates.checkOut}
                                </p>
                            </div>
                            <Link href="#" className="text-primary hover:underline">
                                Edit
                            </Link>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">End Date</h3>
                                <p className="text-gray-600">
                                    {dates.checkIn} – {dates.checkOut}
                                </p>
                            </div>
                            <Link href="#" className="text-primary hover:underline">
                                Edit
                            </Link>
                        </div>

                    </section>

                    <Alert>
                        <AlertTitle>
                            Cancellation policy
                        </AlertTitle>
                        <AlertDescription>
                            This reservation is non-refundable.
                        </AlertDescription>
                    </Alert>


                    {/* Ground Rules */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Ground rules</h2>
                        <p className="text-gray-600">
                            We ask every guest to remember a few simple things about what makes a great guest.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Follow the house rules</li>
                            <li>{"Treat your Host's home like your own"}</li>
                        </ul>
                    </section>

                    {/* Terms Agreement */}
                    <section className="text-sm text-gray-600">
                        <p>
                            By selecting the button below, I agree to the{" "}
                            and that Airbnb can{" "}
                            <Link href="#" className="text-primary hover:underline">
                                charge my payment method
                            </Link>{" "}
                            {" if I'm responsible for damage."}
                        </p>
                    </section>
                </div>

                {/* Price Details Card */}
                <div className="lg:col-span-1">
                    <div className="border rounded-xl p-6 space-y-6 sticky top-4">
                        <div className="flex gap-4">
                            <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.name}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-medium">{property.name}</h3>
                                <p className="text-gray-600">{property.type}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Price details</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>
                                        ₹{pricing.nightlyRate.toLocaleString()} x {pricing.nights} nights
                                    </span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Airbnb service fee</span>
                                    <span>₹{pricing.serviceFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes</span>
                                    <span>₹{pricing.taxes.toLocaleString()}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-semibold">
                                    <span>Total (INR)</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

