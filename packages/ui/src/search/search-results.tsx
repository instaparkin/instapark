"use client"

import * as React from "react"
import { Button } from "../components/button"
import { Input } from "../components/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/popover"
import { cn } from "../utils/cn"
import { Search } from 'lucide-react'
import { Hits, InstantSearch, SearchBox } from "react-instantsearch"
import { typesenseSearchClient } from "@instapark/search"
import { Card, CardHeader, CardTitle } from "../components/card"
import { AppDispatch, fetchGeoLocations, RootState, useDispatch, useSelector } from "@instapark/state"

const regions = [
    {
        name: "I'm flexible",
        image: "/placeholder.svg?height=100&width=100",
        mapCoords: "world"
    },
    {
        name: "Europe",
        image: "/placeholder.svg?height=100&width=100",
        mapCoords: "europe"
    },
    {
        name: "Italy",
        image: "/placeholder.svg?height=100&width=100",
        mapCoords: "italy"
    },
    {
        name: "Southeast Asia",
        image: "/placeholder.svg?height=100&width=100",
        mapCoords: "southeast-asia"
    },
    {
        name: "United Kingdom",
        image: "/placeholder.svg?height=100&width=100",
        mapCoords: "uk"
    },
    {
        name: "Middle East",
        image: "/placeholder.svg?height=100&width=100",
        mapCoords: "middle-east"
    },
]

export function SearchResults() {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const filteredRegions = regions.filter(region =>
        region.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        if (!open) setOpen(true)
    }

    const handleInputClick = () => {
        setOpen(true)
        // Focus the input after a short delay to ensure it's focusable
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    
    const dispatch = useDispatch<AppDispatch>();

    const { geoLocations } = useSelector((state: RootState) => state.maps);

    console.log(geoLocations);


    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchGeoLocations(`https://photon.komoot.io/api/?q=${e.target.value}&limit=5`));
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search destinations"
                        value={search}
                        onChange={handleInputChange}
                        onClick={handleInputClick}
                        ref={inputRef}
                        className="py-6"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSearch("")
                            inputRef.current?.focus()
                        }}
                    >
                        {search ? (
                            <span className="sr-only">Clear search</span>
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                        {search && "×"}
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-[300px] p-0"
                align="start"
                onInteractOutside={(e) => {
                    if (e.target === inputRef.current) {
                        e.preventDefault()
                    }
                }}
            >
                <InstantSearch searchClient={typesenseSearchClient} indexName="listings_1" >
                    <div className="flex flex-col p-4">
                        <SearchBox
                            onInput={onValueChange}
                            classNames={{
                                input: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                submitIcon: "hidden",
                                resetIcon: "hidden"
                            }}
                        />
                        <div className='grid grid-cols-3 gap-4'>
                            {geoLocations.map((location) => {
                                return (
                                    <Card key={location.id}>
                                        <CardHeader>
                                            <CardTitle>
                                                {location?.properties?.country as string}
                                                {location?.properties?.state as string}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>

                                )
                            })}
                        </div>
                        <Hits
                            contextMenu="true"
                            classNames={{
                                list: "grid grid-cols-3 gap-4"
                            }} hitComponent={({ hit }) => {
                                return (
                                    <Card key={hit.objectID}>
                                        <CardHeader>
                                            <CardTitle>{hit.createdAt}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                )
                            }} />

                    </div>
                </InstantSearch>
            </PopoverContent>
        </Popover>
    )
}

