"use client"

import { useEffect, useState } from 'react'
import { HomeFacets } from './home-facets'
import axios from 'axios'
import { ApiResponse, Listing } from '@instapark/types'
import { ListingCard } from '../components/listing-card'
import { SearchBarMain } from '../search/search-bar-main'

export const HomeMain = () => {
    const [data, setData] = useState<Listing[]>([]);
    console.log(data);

    useEffect(() => {
        axios.get<ApiResponse<Listing>>("http://localhost:8087/listings/listings/all?vehicleType=Cycle").then(res => setData(res.data.data as unknown as Listing[])
        )
    }, [])
    return (
        <div>
            <SearchBarMain />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.map((item, index) => (
                    <ListingCard key={index} listing={item} />
                ))}
            </div>
        </div>
    )
}
