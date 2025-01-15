"use client"

import React, { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger } from "../components/tabs"
import { SearchFilter } from './search-filter'
import { Vehicle } from '@instapark/types'
import { AppDispatch, searchListings, useDispatch } from '@instapark/state'
import { Bike, Car } from 'lucide-react'
import { MdCyclone } from 'react-icons/md'

export const SearchFilterVehicle = () => {
    const dispatch = useDispatch<AppDispatch>();

    const vehicles: Record<Vehicle, ReactNode> = {
        Bike: <Bike />,
        Car: <Car />,
        Cycle: <MdCyclone />
    }

    return (
        <SearchFilter title='Allowed Vehicles'>
            <Tabs>
                <TabsList className='grid grid-cols-3 gap-1'>
                    {
                        Object.keys(vehicles).map((v, index) => {
                            const vehicle = v as Vehicle;
                            return (
                                <TabsTrigger
                                    key={index}
                                    onClick={() => {
                                        dispatch(searchListings({
                                            query_by: ["*"],
                                            collections: [{
                                                name: "listing_1",
                                                q: "*",
                                                filter_by: `allowedVehicles:[${vehicle}]`
                                            }]
                                        }))
                                    }}
                                    value={vehicle}
                                >
                                    {vehicles[vehicle]}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>
            </Tabs>
        </SearchFilter>
    )
}
