"use client"

import * as React from "react"
import { Hits, InstantSearch, SearchBox } from "react-instantsearch"
import { typesenseSearchClient } from "@instapark/search"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/card"
import { AppDispatch, fetchGeoLocations, RootState, useDispatch, useSelector } from "@instapark/state"
import { cn } from "../utils/cn"
import { LocateIcon } from "lucide-react"
import { IoLocationOutline } from "react-icons/io5";

export function TypesenseSearch() {
    const [isContentVisible, setIsContentVisible] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)

    const dispatch = useDispatch<AppDispatch>();
    const { geoLocations } = useSelector((state: RootState) => state.maps);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value)
        setIsContentVisible(value.length > 0)
        dispatch(fetchGeoLocations(`https://photon.komoot.io/api/?q=${value}&limit=5`));
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node) && inputRef.current !== e.target) {
            setIsContentVisible(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <InstantSearch searchClient={typesenseSearchClient} indexName="listings_1">
            <div className="relative w-full mx-auto">
                <SearchBox
                    ref={inputRef}
                    onInput={handleInputChange}
                    onFocus={() => setIsContentVisible(true)}
                    classNames={{
                        root: "",
                        form: "",
                        input: cn(
                            "flex h-10  rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            isContentVisible && "ring-2 ring-ring ring-offset-2"
                        ),
                        submit: "hidden",
                        reset: "hidden",
                    }}
                />
                <div
                    ref={contentRef}
                    className={cn(
                        " absolute left-0 right-0 top-full mt-4 w-[300px] md:w-[428px] h-[421px] overflow-y-scroll no-scrollbar rounded-xl border border-input bg-background shadow-md transition-all",
                        isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                >
                    <div className="flex flex-col">
                        <div className='grid'>
                            <Hits
                                classNames={{
                                    list: "grid gap-4",
                                }}
                                hitComponent={({ hit }) => (
                                    <Card key={hit.objectID} className="rounded-none">
                                        <CardHeader>
                                            <CardTitle className="truncate">{hit.createdAt}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                )}
                            />
                            {geoLocations.map((location) => (
                                <Card key={location.id} className="rounded-none">
                                    <CardHeader>
                                        <CardDescription className="flex items-center gap-4 w-full">
                                            <div className="border p-4 bg-accent rounded-lg flex items-center justify-center">
                                                <IoLocationOutline />
                                            </div>
                                            <div className="flex flex-wrap gap-1 leading-tight line-clamp-2">
                                                {[
                                                    location?.properties?.name,
                                                    location?.properties?.city,
                                                    location?.properties?.state,
                                                    location?.properties?.country,
                                                ]
                                                    .filter(Boolean) // Remove undefined or null values
                                                    .join(", ")}
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </InstantSearch>
    )
}

