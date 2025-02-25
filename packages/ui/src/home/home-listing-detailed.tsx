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
import { formatLocation } from '../utils/field-name'
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
    if (loading) {
        return <ListingLoadingSkeleton />
    }

    if (error) {
        toast.error(`Error: ${error.message}`);
    }

    const listing = data?.ListingQuery?.hostListings?.at(0) as Listing

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ListingDetailedHeader
                title={formatLocation(listing.street, listing.city)}
                onShare={() => console.log('Share clicked')}
                onSave={() => console.log('Save clicked')}
            />
            <ListingPhotoGrid
                photos={listing.photos}
                onShowAllPhotos={() =>
                    <PhotoModal photos={listing.photos}
                        onClose={function (): void {
                            throw new Error('Function not implemented.')
                        }} />} />
            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2">
                    <div className="border-b pb-4 mb-6">
                        <h2 className="text-xl font-semibold">
                            {listing.type} {" in "}{listing.city}, {listing.country}
                        </h2>
                    </div>
                    <UserMini
                        className='border-none'
                        host={true}
                        firstName={"host?.firstName as string"}
                        lastName={"host?.lastName as string"}
                        timeJoined={listing.user?.timeJoined as number} />
                </div>
                <div className="min-h-screen">
                    {/* Desktop View */}
                    <div className="hidden md:block max-w-md mx-auto pt-8">
                        <PricingCalculator
                            instaparkFeePercentage={30}
                            pphbi={listing.pphbi}
                            pphcy={listing.pphcy}
                            pphcr={listing.pphcr}
                            plph={listing.plph}
                            basePrice={listing.basePrice}
                        />
                        <ListingReserve
                            listingId={listing.id}
                            userId={listing.userId}
                            startDate={1739503313}
                            endDate={1739589713}
                            basePrice={2200}
                            parkingPrice={170}
                            totalPrice={3081}
                            ipFee={711}
                            customer={{
                                customer_name: '',
                                customer_email: '',
                                customer_phone: ''
                            }}
                            vendor_id={''} />
                    </div>

                    {/* Mobile View with Drawer */}
                    <PricingDrawer
                        basePrice={listing.basePrice}
                        discountedPrice={33818}
                        startDate="5"
                        endDate="10 Jan"
                        pphbi={listing.pphbi}
                        pphcy={listing.pphcy}
                        pphcr={listing.pphcr}
                        plph={listing.plph}
                    />
                </div>
            </div>
            <HomeListingRating />
            <MapsMain maxZoom={14} location={{ lat: listing.latitude, lng: listing.longitude }} />
        </div>
    )
}