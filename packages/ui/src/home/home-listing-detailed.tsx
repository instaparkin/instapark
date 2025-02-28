'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { PricingCalculator } from '../listings/pricing-calculator'
import { MapsMain } from '../maps/maps-main'
import { ListingReserve } from '../listings/listings-reserve'
import { useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { ListingLoadingSkeleton } from './home-detailed-loading'
import { HomeListingRating } from './home-listing-rating'
import { formatLocation, formatName } from '../utils/field-name'
import { UserMini } from '../components/user-mini'
import { Listing, PricingCalulator } from '../__generated__/graphql'
import { Card, CardContent } from '../components/card'
import { Vehicle } from '@instapark/types'
import { useAuth } from '../hooks/use-auth'
import { ImageSwiper } from '../components/image-swiper'
import { uuidToAlphanumeric } from '@instapark/common'
import { HOST_LISTINGS } from '../graphql/host-listings'
import { RootState, useSelector } from '@instapark/state'

interface ListingProps {
    listingId: string
}

export const HomeListingsDetailed: React.FC<ListingProps> = ({
    listingId
}) => {
    const { data, loading, error } = useQuery(HOST_LISTINGS,
        {
            variables: {
                id: listingId,
                startDate: null,
                endDate: null
            }
        });
    const listing = data?.ListingQuery?.hostListings?.at(0) as Listing;

    if (loading) {
        return <div>Loading</div>
    }

    if (error) {
        toast.error(`${error}`)
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">{formatLocation(listing?.street, listing?.city)}</h1>
            </div>
            <div className="relative aspect-video">
                <ImageSwiper content={listing?.photos} />
            </div>
            <UserMini
                host={true}
                firstName={listing?.user?.firstName as string}
                lastName={listing?.user?.lastName as string}
                timeJoined={listing?.user?.timeJoined as number} />
            <div className='flex flex-col lg:flex-row flex-1 gap-6'>
                <PricingCalculator
                    listingId={listing?.id}
                />
                <Card className="p-6 rounded-2xl border">
                    <CardContent>
                        <h2 className="text-xl font-semibold text-orange-500 mb-4">How Pricing Works</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li>
                                <strong>Base Price:</strong> A standard charge that applies to all rentals.
                            </li>
                            <li>
                                <strong>Hourly Rate:</strong> ₹933.29 per hour, calculated based on your rental duration.
                            </li>
                            <li>
                                <strong>Instapark Fee (30%):</strong> A service fee added to your total price.
                            </li>
                            <li>
                                <strong>Penalty Per Hour:</strong> ₹937.45 for exceeding the rental period.
                            </li>
                            <li>
                                <strong>Total:</strong> Sum of all applicable charges based on the duration and fees.
                            </li>
                        </ul>
                        <p className="text-gray-500 text-sm mt-4">
                            Prices may vary based on demand and vehicle availability. Always check before confirming your reservation.
                        </p>
                    </CardContent>
                </Card>
                {/* <ListingReserve
                    listingId={listing?.id}
                    userId={listing?.userId}
                    startDate={1739503313}
                    endDate={1739589713}
                    basePrice={2200}
                    parkingPrice={170}
                    totalPrice={3081}
                    ipFee={711}
                    customer={{
                        customer_name: formatName(firstName, lastName),
                        customer_email: emails?.at(0) as string,
                        customer_phone: phoneNumber as string
                    }}
                    vendor_id={uuidToAlphanumeric(listing?.userId)}
                    vehicle={Vehicle.Car} /> */}
            </div>
            <MapsMain maxZoom={14} location={{ lat: listing?.latitude, lng: listing?.longitude }} />
        </div>
    )
}