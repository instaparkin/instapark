import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { Button } from "../components/button"
import { Card, CardContent, CardFooter } from "../components/card"
import { Input } from "../components/input"

const listings = [
    {
        id: 1,
        title: "Cozy Cabin in the Woods",
        location: "Woodstock, New York",
        image: "https://g-33ra03svqjy.vusercontent.net/placeholder.svg?height=300&width=400",
        price: 150,
        rating: 4.92,
        reviews: 128,
    },
    {
        id: 2,
        title: "Beachfront Paradise",
        location: "Malibu, California",
        image: "https://g-33ra03svqjy.vusercontent.net/placeholder.svg?height=300&width=400",
        price: 300,
        rating: 4.85,
        reviews: 95,
    },
    {
        id: 3,
        title: "Urban Loft Experience",
        location: "New York City, New York",
        image: "https://g-33ra03svqjy.vusercontent.net/placeholder.svg?height=300&width=400",
        price: 200,
        rating: 4.78,
        reviews: 210,
    },
    {
        id: 4,
        title: "Mountain View Chalet",
        location: "Aspen, Colorado",
        image: "https://g-33ra03svqjy.vusercontent.net/placeholder.svg?height=300&width=400",
        price: 250,
        rating: 4.95,
        reviews: 75,
    },
    {
        id: 5,
        title: "Lakeside Retreat",
        location: "Lake Tahoe, California",
        image: "https://g-33ra03svqjy.vusercontent.net/placeholder.svg?height=300&width=400",
        price: 180,
        rating: 4.88,
        reviews: 150,
    },
    {
        id: 6,
        title: "Historic Downtown Apartment",
        location: "Charleston, South Carolina",
        image: "https://g-33ra03svqjy.vusercontent.net/placeholder.svg?height=300&width=400",
        price: 140,
        rating: 4.82,
        reviews: 98,
    },
]

export function ListingsDetails() {
    return (
        <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                        <div className="relative aspect-video">
                            <Image
                                src={listing.image}
                                alt={listing.title}
                                layout="fill"
                                objectFit="cover"
                            />
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 right-2 rounded-full"
                            >
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Save to wishlist</span>
                            </Button>
                        </div>
                        <CardContent className="p-4">
                            <h2 className="font-semibold text-lg mb-1">{listing.title}</h2>
                            <p className="text-muted-foreground text-sm mb-2">{listing.location}</p>
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span>{listing.rating}</span>
                                <span className="text-muted-foreground">({listing.reviews} reviews)</span>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <div>
                                <span className="font-semibold">${listing.price}</span> / night
                            </div>
                            <Button asChild variant={"instapark"}>
                                <Link href={`/listings/${listing.id}`}>View</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    )
}