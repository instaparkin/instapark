'use client'

import { Card, CardContent, CardFooter } from './card'
import { Button } from './button'
import { GraduationCap, Grid2X2, Heart, Share, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import { Listing as ListingType } from "@instapark/types"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { PricingCalculator } from '../listings/pricing-calculator'
import { PricingDrawer } from '../listings/pricing-drawer'
import { useSessionContext } from '@instapark/auth'

interface ImageSwiperProps {
    content: string[]
}

interface ListingProps extends ListingType {
    view: 'preview' | 'detailed'
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

interface ListingHeaderProps {
    title: string
    onShare: () => void
    onSave: () => void
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ title, onShare, onSave }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex gap-4">
                <Button variant="ghost" className="flex items-center gap-2" onClick={onShare}>
                    <Share className="w-4 h-4" />
                    Share
                </Button>
                <Button variant="ghost" className="flex items-center gap-2" onClick={onSave}>
                    <Heart className="w-4 h-4" />
                    Save
                </Button>
            </div>
        </div>
    )
}

const ListingPhotoGrid: React.FC<PhotoGridProps> = ({ photos, onShowAllPhotos }) => {
    return (
        <div className="grid grid-cols-4 gap-2 mb-8 relative">
            {photos?.slice(0, 5).map((photo, index) => (
                <div
                    key={index}
                    className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                    <Image
                        src={photo}
                        alt={`Property photo ${index + 1}`}
                        width={index === 0 ? 800 : 400}
                        height={index === 0 ? 200 : 100}
                        className="rounded-lg object-cover w-full h-full"
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
    const session = useSessionContext();

    if (session.loading) {
        return null
    }
    const userId = session.userId;

    const handleCreateContact = async () => {
        await fetch("http://localhost:8084/contacts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                contactUserId: HostUserId
            })
        })
    }

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
                            <h3 className="text-xl font-semibold">{name}</h3>
                            <p className="text-sm text-muted-foreground">Host</p>
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
                            <div className="text-sm text-muted-foreground">Months hosting</div>
                        </div>
                    </div>
                </Card>

                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">Host details</h3>
                    <div className="space-y-2 mb-6">
                        <p>Response rate: {responseRate}%</p>
                        <p>Responds {responseTime}</p>
                    </div>
                    <Button variant="default" className="w-full" asChild onClick={() => handleCreateContact()}>
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
                    <p className="text-muted-foreground">I'm {name} from {location}.</p>
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

const ListingImageSwiper: React.FC<ImageSwiperProps> = ({ content }) => {
    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
                hideOnClick: true,
                clickable: true
            }}
            modules={[Pagination]}
            className="w-full h-full"
        >
            {content.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={`Parking space image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export const Listing: React.FC<ListingProps> = ({
    view,
    listingId,
    userId,
    photos,
    city,
    state,
    district,
    country,
    isOpen,
    allowedVehicles,
    basePrice,
    pphbi,
    pphcr,
    plph,
    pphcy
}) => {
    switch (view) {
        case "preview":
            return (
                <Card key={listingId} className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                        <ListingImageSwiper content={photos} />
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
                        <h2 className="font-semibold text-lg mb-1">
                            {city}, {state}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-2">
                            {city}, {state}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span>Status: {isOpen ? "Open" : "Closed"}</span>
                        </div>
                        <p className="text-sm mt-2">
                            {allowedVehicles.join(", ")}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div>
                            <span className="font-semibold">${basePrice.toFixed(2)}</span> / hour
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={`/parkings/${listingId}`}>
                                View Details
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )
        case "detailed":
            return (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <ListingHeader
                        title={`${state}, ${country}`}
                        onShare={() => console.log('Share clicked')}
                        onSave={() => console.log('Save clicked')}
                    />
                    <ListingPhotoGrid photos={photos} onShowAllPhotos={() => console.log('Show all photos clicked')} />
                    <div className="grid grid-cols-3 gap-12">
                        <div className="col-span-2">
                            <div className="border-b pb-6 mb-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Entire villa in {city}, {country}
                                </h2>
                                <p className="text-muted-foreground">
                                    {allowedVehicles?.length} guests · {basePrice} bedrooms · {pphbi} beds · {pphcr} bathrooms
                                </p>
                            </div>
                            <ListingHostInfo
                                userId={userId}
                                name="Host Name" // Replace with actual host name
                                hostingDuration="12" // Replace with actual hosting duration
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
                                    pphbi={pphbi}
                                    pphcy={pphcy}
                                    pphcr={pphcr}
                                    plph={plph}
                                    basePrice={basePrice}
                                />
                            </div>

                            {/* Mobile View with Drawer */}
                            <PricingDrawer
                                basePrice={basePrice}
                                discountedPrice={33818}
                                startDate="5"
                                endDate="10 Jan"
                                pphbi={pphbi}
                                pphcy={pphcy}
                                pphcr={pphcr}
                                plph={plph}
                            />
                        </div>
                    </div>
                </div>
            )
    }
}

