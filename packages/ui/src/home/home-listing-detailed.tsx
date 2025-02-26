'use client'

import React from 'react'
import { Button } from '../components/button'
import { GraduationCap, Grid2X2, Heart, Share2, Shield, X } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { PricingCalculator } from '../listings/pricing-calculator'
import { PricingDrawer } from '../listings/pricing-drawer'
import { MapsMain } from '../maps/maps-main'
import { ListingReserve } from '../listings/listings-reserve'
import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { ListingLoadingSkeleton } from './home-detailed-loading'
import { HomeListingRating } from './home-listing-rating'
import { formatLocation, formatName } from '../utils/field-name'
import { HOST_LISTINGS } from '../graphql/host-listings'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/sheet"
import { UserMini } from '../components/user-mini'
import { Listing } from '../__generated__/graphql'
import { Card, CardContent } from '../components/card'
import { Vehicle } from '@instapark/types'
import { useAuth } from '../hooks/use-auth'
import { uuidToAlphanumeric } from '../earnings/earnings-main'


interface ListingProps {
    listingId: string
}

interface PhotoGridProps {
    photos: string[]
    onShowAllPhotos?: () => void
}

interface ListingDetailedHeaderProps {
    title: string
    onShare: () => void
    onSave: () => void
}

const ListingDetailedHeader: React.FC<ListingDetailedHeaderProps> = ({ title, onShare }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
    )
}


interface PhotoModalProps {
    photos: string[];
}

export function PhotoModal({ photos }: PhotoModalProps) {
    return (
        <Sheet>
            <SheetTrigger className='flex items-center gap-2'>
                <Grid2X2 className="w-4 h-4" />
                Show all photos
            </SheetTrigger>
            <SheetContent side="top">
                <div className="grid gap-4 my-10 max-h-screen overflow-y-auto p-4">
                    {photos.map((photo, index) => {
                        if (index % 3 === 0) {
                            return (
                                <div key={index} className="relative aspect-[3/2] w-full">
                                    <Image
                                        src={photo}
                                        alt={`Property photo ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                        priority={index === 0}
                                    />
                                </div>
                            );
                        }
                        if (index % 3 === 1) {
                            return (
                                <div key={index} className="grid grid-cols-2 gap-4">
                                    <div className="relative aspect-[3/2]">
                                        <Image
                                            src={photo}
                                            alt={`Property photo ${index + 1}`}
                                            fill
                                            className="object-cover rounded-lg"
                                            sizes="(max-width: 1280px) 50vw, 640px"
                                        />
                                    </div>
                                    {index + 1 < photos.length && (
                                        <div className="relative aspect-[3/2]">
                                            <Image
                                                src={photos[index + 1]}
                                                alt={`Property photo ${index + 2}`}
                                                fill
                                                className="object-cover rounded-lg"
                                                sizes="(max-width: 1280px) 50vw, 640px"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
}

const ListingPhotoGrid: React.FC<PhotoGridProps> = ({ photos, onShowAllPhotos }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 relative h-[300px] md:h-[400px]">
            <div className="relative md:col-span-2 md:row-span-2 h-full">
                <Image
                    src={photos?.[0] || '/placeholder.svg'}
                    alt="Main property photo"
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>
            {photos?.slice(1, 5).map((photo, index) => (
                <div
                    key={index}
                    className="relative hidden md:block h-[198px]"
                >
                    <Image
                        src={photo}
                        alt={`Property photo ${index + 2}`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="25vw"
                    />
                </div>
            ))}
            <Button
                asChild
                variant="secondary"
                className="absolute bottom-4 right-4 flex items-center gap-2"
                onClick={onShowAllPhotos}
            >
                <PhotoModal photos={photos} />
            </Button>
        </div>
    )
}


export const HomeListingsDetailed: React.FC<ListingProps> = ({
    listingId
}) => {
    const { loading, error, data } = useQuery(HOST_LISTINGS, {
        variables: { id: listingId }
    });
    const { firstName, lastName, emails, phoneNumber } = useAuth()

    React.useEffect(() => {
        if (loading) {
            <ListingLoadingSkeleton />
        }
        if (error) {
            toast.error(`Error: ${error.message}`);
        }
    }, [loading, error])

    const listing = data?.ListingQuery?.hostListings?.at(0) as Listing

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ListingDetailedHeader
                title={formatLocation(listing?.street, listing?.city)}
                onShare={() => console.log('Share clicked')}
                onSave={() => console.log('Save clicked')}
            />
            <ListingPhotoGrid
                photos={listing?.photos}
                onShowAllPhotos={() =>
                    console.log("")
                }
            />
            <div className="space-y-10">
                <h2 className="text-xl font-semibold">
                    {listing?.type} {" in "}{listing?.city}, {listing?.country}
                </h2>
                <UserMini
                    host={true}
                    firstName={listing?.user?.firstName as string}
                    lastName={listing?.user?.lastName as string}
                    timeJoined={listing?.user?.timeJoined as number} />
                <div className='flex flex-col lg:flex-row flex-1 gap-6'>
                    <PricingCalculator
                        instaparkFeePercentage={30}
                        pphbi={listing?.pphbi}
                        pphcy={listing?.pphcy}
                        pphcr={listing?.pphcr}
                        plph={listing?.plph}
                        basePrice={listing?.basePrice}
                    />
                    <Card className="p-6 rounded-2xl border">
                        <CardContent>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">How Pricing Works</h2>
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
                </div>
                {/* Desktop View */}
                <ListingReserve
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
                    vehicle={Vehicle.Car} />
            </div>
            <HomeListingRating />
            <MapsMain maxZoom={14} location={{ lat: listing?.latitude, lng: listing?.longitude }} />
        </div>
    )
}