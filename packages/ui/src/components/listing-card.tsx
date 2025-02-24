"use client"

import { Listing, Vehicle } from '@instapark/types'
import React from 'react'
import { Card, CardContent, CardFooter } from '../components/card'
import { ImageSwiper } from '../components/image-swiper'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { Badge } from './badge'
import { PiBicycleDuotone } from "react-icons/pi";
import { FaCarAlt } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";

interface ListingsCard {
    listing: Listing
}

interface ListingCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    listingId: string
}

interface ListingCardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    listing: Listing
}

const ListingCardContent: React.FC<ListingCardContentProps> =
    ({ children, listingId }) => {
        return (
            <Card className="overflow-hidden">
                <Link href={`/parkings/${listingId}`}>
                    {children}
                </Link>
            </Card>
        )
    }

const ListingCardImages: React.FC<React.HTMLAttributes<HTMLDivElement>> =
    ({ children }) => {
        return (
            <div className="relative aspect-[4/3]">
                {children}
            </div>
        )
    }

const ListingCardDescription: React.FC<ListingCardDescriptionProps> =
    ({ listing }) => {
        return (
            <>
                <CardContent className="p-4 flex-col space-y-2">
                    <div className='flex justify-between items-center'>
                        <div className="font-semibold mb-1 truncate">
                            {listing.street}, {listing.city}
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Star className='w-4 h-4 fill-current' />
                            <span className='text-sm'>{listing.rating}</span>
                        </div>
                    </div>
                    <ListingCardAllowedVehicles allowedVehicles={listing.allowedVehicles} />
                    <div className="text-muted-foreground text-sm">
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between listings-center">
                    <div>
                        <span className="font-semibold">${listing.basePrice.toFixed(2)}</span> / hour
                    </div>
                </CardFooter>
            </>
        )
    }


const ListingCardAllowedVehicles = ({ allowedVehicles }: { allowedVehicles: Vehicle[] }) => {
    const vehicleIcons: Record<Vehicle, React.ReactNode> = {
        "Car": <FaCarAlt className="w-4 h-4" />,
        "Bike": <FaMotorcycle className="w-4 h-4" />,
        "Cycle": <PiBicycleDuotone className="w-4 h-4" />,
    };

    return (
        <div className='flex gap-2'>
            {

                allowedVehicles.map((a, index) => (
                    <Badge variant={"outline"} key={index} className="rounded-sm p-2 flex items-center gap-2">
                        {vehicleIcons[a]}
                        {a}
                    </Badge>
                ))
            }
        </div>
    )
}

export const ListingCard: React.FC<ListingsCard> = ({ listing }) => {
    return (
        <ListingCardContent listingId={listing.id}>
            <ListingCardImages>
                <ImageSwiper content={listing.photos} />
            </ListingCardImages>
            <ListingCardDescription
                listing={listing}
            />
        </ListingCardContent>
    );
};
