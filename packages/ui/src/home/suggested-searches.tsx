import React from "react"
import { Building2 } from 'lucide-react'
import { Button } from "../components/button"
import { Icon } from '../components/icon'
import { AppDispatch, searchListings, useDispatch } from '@instapark/state'

interface Destination {
    name: string
    description: string
    type: "beach" | "city" | "nature"
}

const destinations: Destination[] = [
    {
        name: "Hanumanthapura",
        description: "Popular beach destination",
        type: "beach"
    },
    {
        name: "North Goa, Goa",
        description: "For sights like Fort Aguada",
        type: "beach"
    },
    {
        name: "Ooty, Tamil Nadu",
        description: "Great for a weekend getaway",
        type: "city"
    },
    {
        name: "South Goa, Goa",
        description: "For nature lovers",
        type: "nature"
    },
    {
        name: "Mysore, Karnataka",
        description: "For its stunning architecture",
        type: "city"
    },
    {
        name: "Madikeri, Karnataka",
        description: "Great for a weekend getaway",
        type: "nature"
    }
]

export function SuggestedDestinations() {
    const dispatch = useDispatch<AppDispatch>();

    const handleOnClick = async (value: string) => {
        dispatch(searchListings({
            query_by: ["*"],
            collections: [{
                q: value,
                name: "listing_1"
            }]
        }))
    }
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="space-y-2">
                {destinations.map((destination, index) => (
                    <Button
                        onClick={() => handleOnClick(destination.name)}
                        key={index}
                        variant="ghost"
                        className={`w-full justify-start gap-3 h-auto py-3`}
                    >
                        <Icon className='rounded-sm'>
                            <Building2 />
                        </Icon>
                        <div className="flex flex-col items-start">
                            <span className="font-medium text-gray-900">{destination.name}</span>
                            <span className="text-sm text-gray-500">{destination.description}</span>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    )
}

