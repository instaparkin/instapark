'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { PricingCalculator } from '../listings/pricing-calculator'
import { MapsMain } from '../maps/maps-main'
import { useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { formatLocation, formatName, formatPrice } from '../utils/field-name'
import { UserMini } from '../components/user-mini'
import { Listing, PricingCalulator } from '../__generated__/graphql'
import { ImageSwiper } from '../components/image-swiper'
import { HOST_LISTINGS } from '../graphql/host-listings'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/accordion'
import { ShieldCheck } from 'lucide-react'
import { HomeListingsDetailedSkeleton } from './home-listing-detailed-skeleton'
import { ListingReserveButton } from '../listings/listings-reserve-button'

const items = [
    {
        id: "1",
        title: "What is Base Price?",
        content:
            "Base Price is the fixed amount which is applied to all parkings and depends on the host",
    },
    {
        id: "2",
        title: "What is Parking Price?",
        content:
            "Parking price is the actual cost calculated by the Pricing per hour of the vehicle with the number of hours the vehicle was parked",
    },
    {
        id: "3",
        title: "What is Instapark Fee?",
        content:
            "Instapark fee is 30% of base Price and Parking Fee",

    },
    {
        id: "4",
        title: "What is Total Price?",
        content:
            "Total Price is the sum of base Price, parking price and instapark fee which the buyer is supposed to pay",
    },
];
interface ListingProps {
    listingId: string
}

export const HomeListingsDetailed: React.FC<ListingProps> = ({
    listingId
}) => {
    const { data, loading, error } = useQuery(HOST_LISTINGS,
        {
            variables: {
                id: listingId,
            }
        });
    const listing = data?.ListingQuery?.hostListings?.at(0) as Listing;

    if (loading) {
        return <HomeListingsDetailedSkeleton />
    }

    if (error) {
        toast.error(`${error}`)
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">{formatLocation(listing?.street, listing?.city)}</h1>
            </div>
            <div className="relative aspect-video">
                <ImageSwiper content={listing?.photos} />
            </div>
            <UserMini
                host={true}
                firstName={listing?.user?.firstName as string}
                lastName={listing?.user?.lastName as string}
                timeJoined={listing?.user?.timeJoined as number} />
            <div className='flex flex-col lg:flex-row col-span-2 gap-6'>
                <PricingCalculator
                    hostId={listing?.userId}
                    listingId={listing?.id}
                />
                <div className="w-full lg:w-lg transition-all duration-300">
                    <h2 className='font-bold'>FAQs</h2>
                    <Accordion type="single" collapsible defaultValue="3">
                        {items.map((item) => (
                            <AccordionItem value={item.id} key={item.id} className="py-2">
                                <AccordionTrigger className='text-pretty'>
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="flex grow gap-3 border bg-primary-foreground p-4 rounded-md my-6">
                        <ShieldCheck className="mt-0.5 shrink-0 text-blue-500" size={16} aria-hidden="true" />
                        <div className="flex grow justify-between gap-12">
                            <p className="text-sm">Always use Instapark for safe and secure payments</p>
                        </div>
                    </div>
                </div>
            </div>
            <MapsMain maxZoom={14} location={{ lat: listing?.latitude, lng: listing?.longitude }} />
        </div>
    )
}