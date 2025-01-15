"use client"

import { Listing } from '@instapark/types'
import React from 'react'
import { Card, CardContent, CardFooter } from '../components/card'
import { ImageSwiper } from '../components/image-swiper'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { ListingWishlist } from './listing-wishlist'

interface ListingsCard {
    listing: Listing
}

interface ListingCardImagesProps extends React.HTMLAttributes<HTMLDivElement> {

}

interface ListingCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    listingId: string
}

interface ListingCardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    state: Listing["state"]
    city: Listing["city"]
    basePrice: Listing["basePrice"]
    allowedVehicles: Listing["allowedVehicles"]
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

const ListingCardImages: React.FC<ListingCardImagesProps> =
    ({ children }) => {
        return (
            <div className="relative aspect-[4/3]">
                {children}
                <div className='absolute top-2 right-2 z-10 bg-accent rounded-full' onClick={(e) => e.stopPropagation()}>
                    <ListingWishlist />
                </div>
            </div>
        )
    }

const ListingCardDescription: React.FC<ListingCardDescriptionProps> =
    ({ state, city, allowedVehicles, basePrice }) => {
        return (
            <>
                <CardContent className="p-4 flex-col">
                    <div className='flex justify-between items-center'>
                        <div className="font-semibold mb-1">
                            {city}, {state}
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Star className='w-4 h-4 fill-current' />
                            <span className='text-sm'>{4.96}</span>
                        </div>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        {"123 KMs away"}
                    </div>
                    <div className="text-muted-foreground text-sm">
                        {"24- 29May"}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between listings-center">
                    <div>
                        <span className="font-semibold">${basePrice.toFixed(2)}</span> / hour
                    </div>
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
                basePrice={listing.basePrice}
                state={listing.state}
                city={listing.city}
                allowedVehicles={listing.allowedVehicles}
            />
        </ListingCardContent>
    );
};
