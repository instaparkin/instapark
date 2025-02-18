'use client'

import React from 'react'
import { Card } from '../components/card'
import { Button } from '../components/button'
import { GraduationCap, Grid2X2, Heart, Share, Share2, Shield, X } from 'lucide-react'
import Link from 'next/link'
import { ApiResponse, Listing, Listing as ListingType } from "@instapark/types"
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { PricingCalculator } from '../listings/pricing-calculator'
import { PricingDrawer } from '../listings/pricing-drawer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ListingWishlist } from '../components/listing-wishlist'
import { useAuth } from '../hooks/use-auth'
import { timeInInstapark } from '../utils/dayjs'
import { Page } from '../components/page'
import { MapsMain } from '../maps/maps-main'
import { ListingReserve } from '../listings/listings-reserve'
import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { ListingLoadingSkeleton } from './home-detailed-loading'

interface ListingProps {
    listingId: string
}

interface HostInfoProps {
    userId: string
    name: string
    hostingDuration: string
    reviews: number
    rating: number
    school?: string
    location?: string
    responseRate?: number
    responseTime?: string
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
            <div className="flex justify-between border">
                <Button variant="ghost" className="flex items-center gap-2" onClick={onShare}>
                    <Share className="w-4 h-4" />
                    Share
                </Button>
                <ListingWishlist triggerText='Save' />
            </div>
        </div>
    )
}


export interface PhotoModalProps {
    photos: ListingType["photos"]
    onClose: () => void
}


export function PhotoModal({ photos, onClose }: PhotoModalProps) {
    return (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            <div className="sticky top-0 w-full bg-background/80 backdrop-blur-sm z-10 p-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="hover:bg-background/60"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-background/60">
                            <Share2 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-background/60">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid gap-4">
                    {photos.map((photo, index) => {
                        if (index % 3 === 0) {
                            // First photo in each group of 3 - takes full width
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
                            )
                        } else {
                            // Second and third photos in each group - side by side
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
                                        {photos[index + 1] && (
                                            <div className="relative aspect-[3/2]">
                                                <Image
                                                    src={photos[index + 1] as string}
                                                    alt={`Property photo ${index + 2}`}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                    sizes="(max-width: 1280px) 50vw, 640px"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                            // Skip the third photo as it's handled in the previous block
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    )
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
                <Grid2X2 className="w-4 h-4" />
                Show all photos
            </Button>
        </div>
    )
}

function ListingHostInfo({
    userId: HostUserId,
    name,
    hostingDuration,
    reviews,
    rating,
    school,
    location,
    responseRate = 100,
    responseTime = "within an hour"
}: HostInfoProps) {

    const { first_name, last_name, timeJoined } = useAuth()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Meet your Host</h2>
            <div className="flex gap-8">
                <Card className="p-6 flex-1">
                    <div className="flex gap-4">
                        <div className="relative">
                            <div className="bg-neutral-900 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium">
                                {name[0]}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-rose-500 text-white p-1 rounded-full">
                                <Shield className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{first_name}</h3>
                            <p className="text-sm text-muted-foreground">{last_name}</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4 border-t pt-4">
                        <div>
                            <div className="text-2xl font-semibold">{reviews}</div>
                            <div className="text-sm text-muted-foreground">Reviews</div>
                        </div>

                        <div>
                            <div className="text-2xl font-semibold">{rating.toFixed(1)}★</div>
                            <div className="text-sm text-muted-foreground">Rating</div>
                        </div>

                        <div>
                            <div className="text-2xl font-semibold">{parseInt(hostingDuration)}</div>
                            <div className="text-sm text-muted-foreground">{timeInInstapark(timeJoined / 1000)}</div>
                        </div>
                    </div>
                </Card>

                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">Host details</h3>
                    <div className="space-y-2 mb-6">
                        <p>Response rate: {responseRate}%</p>
                        <p>Responds {responseTime}</p>
                    </div>
                    <Button variant="default" className="w-full">
                        <Link href={`/messages/${HostUserId}`}>
                            Message Host
                        </Link>
                    </Button>
                </div>
            </div>

            {school && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-5 h-5" />
                    <span>Where I went to school: {school}</span>
                </div>
            )}

            {location && (
                <div>
                    <p className="text-muted-foreground">{`I'm ${name} from ${location}.`}</p>
                    <button className="mt-2 font-medium underline">Show more</button>
                </div>
            )}

            <div className="flex items-start gap-2 text-sm text-muted-foreground border-t pt-6">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <p>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
            </div>
        </div>
    )
}

interface ListingDetailedContentProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const ListingDetailedContent: React.FC<ListingDetailedContentProps> = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {children}
        </div>
    )
}

export const HomeListingsDetailed: React.FC<ListingProps> = ({
    listingId
}) => {

    const GET_LISTING = gql`
    query GET_LISTINGS($id: String!) {
  ListingQuery {
    getListingById(id: $id) {
      allowedVehicles
      basePrice
      city
      country
      createdAt
      district
      id
      isOpen
      landmark
      userId
      type
      state
      street
      pincode
      latitude
      longitude
      name
      pphbi
      pphcy
      pphcr
      plph
      photos
      rating
      updatedAt
    }
  }
}
`

    const { loading, error, data } = useQuery(GET_LISTING, {
        variables: { id: listingId }
    });
    const { userId } = useAuth()

    if (loading) {
        return <ListingLoadingSkeleton />
    }

    if (error) {
        toast.error(`Error: ${error.message}`);
    }

    const listing: Listing = data.ListingQuery.getListingById

    return (
        <ListingDetailedContent>
            <ListingDetailedHeader
                title={`${listing.state}, ${listing.country}`}
                onShare={() => console.log('Share clicked')}
                onSave={() => console.log('Save clicked')}
            />
            <ListingPhotoGrid photos={listing.photos} onShowAllPhotos={() => console.log('Show all photos clicked')} />
            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2">
                    <div className="border-b pb-4 mb-6">
                        <h2 className="text-xl font-semibold">
                            {listing.type} {" in "}{listing.city}, {listing.country}
                        </h2>
                    </div>
                    <ListingHostInfo
                        userId={listing.userId}
                        name="Host Name"
                        hostingDuration="12"
                        reviews={4}
                        rating={4.5}
                        responseRate={100}
                        responseTime="within an hour"
                    />
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
                        <ListingReserve listingId={listing.id} userId={userId} startDate={1739503313} endDate={1739589713} />
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
            <MapsMain listings={[listing]} />
        </ListingDetailedContent>
    )
}

