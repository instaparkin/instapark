"use client"

import { Listing } from '@instapark/types'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '../components/card'
import { ImageSwiper } from '../components/image-swiper'
import { Button } from '../components/button'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { Input } from './input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { WishListForm } from '@instapark/forms'

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
                <div onClick={(e) => e.stopPropagation()}>
                    <ListingWishlist />
                </div>
            </div>
        )
    }

const ListingCardDescription: React.FC<ListingCardDescriptionProps> =
    ({ state, city, allowedVehicles, basePrice }) => {
        return (
            <>
                <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-1">
                        {city}, {state}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-2">
                        {city}, {state}
                    </p>
                    <p className="text-sm mt-2">
                        {allowedVehicles.join(", ")}
                    </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between listings-center">
                    <div>
                        <span className="font-semibold">${basePrice.toFixed(2)}</span> / hour
                    </div>
                </CardFooter>
            </>
        )
    }

const ListingWishlist = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleButtonClick = (event: React.MouseEvent) => {
        setOpen(true);
        event.preventDefault();
        event.stopPropagation();
    };

    const form = WishListForm();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full z-10"
                    onClick={handleButtonClick}
                >
                    <Heart className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-center my-2'>Add To Wishlist</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export const ListingCard: React.FC<ListingsCard> = ({ listing }) => {
    return (
        <ListingCardContent listingId={listing.listingId}>
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
