import { Listing } from '@instapark/types'
import React from 'react'
import { Card, CardContent, CardFooter } from '../components/card'
import { ImageSwiper } from '../components/image-swiper'
import { Button } from '../components/button'
import { Heart } from 'lucide-react'
import Link from 'next/link'

interface ListingsCard {
    listing: Listing
}

export const ListingsCard: React.FC<ListingsCard> = ({ listing }) => {
    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-[4/3]">
                <ImageSwiper content={listing.photos} />
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full z-10"
                >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Save to wishlist</span>
                </Button>
            </div>
            <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-1">
                    {listing.city}, {listing.state}
                </h2>
                <p className="text-muted-foreground text-sm mb-2">
                    {listing.city}, {listing.state}
                </p>
                <p className="text-sm mt-2">
                    {listing.allowedVehicles.join(", ")}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between listings-center">
                <div>
                    <span className="font-semibold">${listing.basePrice.toFixed(2)}</span> / hour
                </div>
                <Button variant="outline" asChild>
                    <Link href={`/parkings/${listing.listingId}`}>
                        View Details
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
