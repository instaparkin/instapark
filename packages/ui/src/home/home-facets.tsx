'use client'

import React, { useState } from 'react'
import { Label } from "../components/label"
import { RadioGroup, RadioGroupItem } from "../components/radio-group"
import { Button } from "../components/button"
import { Switch } from "../components/switch"
import { Umbrella, ImagesIcon as Icons, Trees, BedDouble, Sparkles, Mountain, MountainIcon as Mountain2, Warehouse, Waves, ChevronRight, SlidersHorizontal, House } from 'lucide-react'
import { PlaceType } from '@instapark/listings'
import { BsHouseDoor } from 'react-icons/bs'
import { LuHotel } from 'react-icons/lu'
import { PiBarn, PiCastleTurret, PiFarm } from 'react-icons/pi'
import { MdOutlineCabin } from 'react-icons/md'
import { SearchListingsFilter } from '../search/search-listings-filter'
import { AppDispatch, searchListings, useDispatch } from '@instapark/state'

export type CategoryType = {
    id: string
    label: string
    icon: React.ReactNode
}

const categories: CategoryType[] = [
    {
        id: "beach",
        label: "Beach",
        icon: <Umbrella className="h-6 w-6" />,
    },
    {
        id: "icons",
        label: "Icons",
        icon: <Icons className="h-6 w-6" />,
    },
    {
        id: "countryside",
        label: "Countryside",
        icon: <Trees className="h-6 w-6" />,
    },
    {
        id: "rooms",
        label: "Rooms",
        icon: <BedDouble className="h-6 w-6" />,
    },
    {
        id: "new",
        label: "New",
        icon: <Sparkles className="h-6 w-6" />,
    },
    {
        id: "national-parks",
        label: "National parks",
        icon: <Mountain className="h-6 w-6" />,
    },
    {
        id: "amazing-views",
        label: "Amazing views",
        icon: <Mountain2 className="h-6 w-6" />,
    },
    {
        id: "farms",
        label: "Farms",
        icon: <Warehouse className="h-6 w-6" />,
    },
    {
        id: "amazing-pools",
        label: "Amazing pools",
        icon: <Waves className="h-6 w-6" />,
    },
]

export type PlaceTypeWithIcon = {
    type: PlaceType;
    icon: React.ReactNode;
};

const placetypes: PlaceTypeWithIcon[] = [
    {
        type: "House",
        icon: <House className="h-6 w-6" />,
    },
    {
        type: "Hotel",
        icon: <LuHotel className="h-6 w-6" />,
    },
    {
        type: "Castle",
        icon: <PiCastleTurret className="h-6 w-6" />,
    },
    {
        type: "Cabin",
        icon: <MdOutlineCabin className="h-6 w-6" />,
    },
    {
        type: "Barn",
        icon: <PiBarn className="h-6 w-6" />,
    },
    {
        type: "Farm",
        icon: <PiFarm className="h-6 w-6" />,
    },
];

export function HomeFacets() {
    const [selectedCategory, setSelectedCategory] = useState<string>("beach")
    const dispatch = useDispatch<AppDispatch>()
    const handleValueChange = async (value: PlaceType) => {
        setSelectedCategory(value);
        dispatch(searchListings({
            query_by: ["*"],
            collections: [{
                name: "listing_1",
                q: "*",
                filter_by: `type:[${value}]`
            }]
        }))
    }

    return (
        <div className="flex overflow-x-auto justify-center no-scrollbar">
            <RadioGroup
                value={selectedCategory}
                onValueChange={handleValueChange}
                className="flex items-center space-x-4 px-2"
            >
                {placetypes.map((p) => (
                    <div key={p.type} className="flex-shrink-0">
                        <RadioGroupItem value={p.type} id={p.type} className="peer sr-only" />
                        <Label
                            htmlFor={p.type}
                            className="flex flex-col items-center gap-1 px-4 py-2 cursor-pointer border-b-2 border-transparent text-neutral-500 hover:border-neutral-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary transition-colors"
                        >
                            {p.icon}
                            <span className="text-sm whitespace-nowrap">{p.type}</span>
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

