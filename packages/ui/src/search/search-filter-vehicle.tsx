"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { SearchFilter } from './search-filter'
import { Vehicle } from '@instapark/listings'
import { AppDispatch, searchListings, useDispatch } from '@instapark/state'

export const SearchFilterVehicle = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <SearchFilter title='Allowed Vehicles'>
            <Tabs>
                <TabsList className='grid grid-cols-3 gap-1'>
                    {
                        Object.keys(Vehicle).map(v => (
                            <TabsTrigger
                                onClick={() => {
                                    dispatch(searchListings({
                                        query_by: ["*"],
                                        collections: [{
                                            name: "listing_1",
                                            q: "*",
                                            filter_by: `allowedVehicles:[${v}]`
                                        }]
                                    }))
                                }}
                                value={v}>
                                {v}</TabsTrigger>
                        ))
                    }
                </TabsList>
            </Tabs>
        </SearchFilter>
    )
}
