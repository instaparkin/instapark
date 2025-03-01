"use client"

import { Listing } from '@instapark/types'
import React from 'react'
import { Card, CardContent, CardFooter } from '../components/card'
import { ImageSwiper } from '../components/image-swiper'
import Link from 'next/link'
import { Badge } from './badge'
import { PiBicycleDuotone } from "react-icons/pi";
import { FaCarAlt } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { formatPrice } from '../utils/field-name'

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
                <CardFooter className="p-4 pt-0 flex flex-wrap items-center gap-4">
                    {listing.pphcr ?
                        <Badge variant="outline" className="gap-2">
                            <FaCarAlt size={16} />
                            {formatPrice(listing.pphcr)}
                        </Badge> : null
                    }
                    {listing.pphbi ?
                        <Badge variant="outline" className="gap-2">
                            <FaMotorcycle size={16} />
                            {formatPrice(listing.pphbi)}
                        </Badge> : null
                    }
                    {listing.pphcy ?
                        <Badge variant="outline" className="gap-2">
                            <PiBicycleDuotone size={16} />
                            {formatPrice(listing.pphcy)}
                        </Badge> : null
                    }
                </CardFooter >
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
