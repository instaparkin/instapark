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
import { formatPrice } from '../utils/field-name'
import { Details } from './details'

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
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between listings-center">
                    <Details
                        className=''
                        items={[
                            { field: "Bike", value: formatPrice(listing.pphbi), visible: listing.pphbi != 0 },
                            { field: "Car", value: formatPrice(listing.pphcr), visible: listing.pphcr != 0 },
                            { field: "Cycle", value: formatPrice(listing.pphcy), visible: listing.pphcy != 0 },
                        ]}
                    />
                </CardFooter>
            </>
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
