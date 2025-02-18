'use client'

import React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/select"

export function HomeFacets() {

    const vehicleIcons: { type: string }[] = [
        { type: "Car" },
        { type: "Bike" },
        { type: "Cycle" },
    ];

    return (
        <Select>
            <SelectTrigger className="">
                <SelectValue placeholder="Vehicle Type" />
            </SelectTrigger>
            <SelectContent className='flex'>
                {
                    vehicleIcons.map(v => {
                        return (
                            <SelectItem key={v.type} className='cursor-pointer w-full border' value={v.type}>
                                {v.type}
                            </SelectItem>
                        )
                    })
                }
            </SelectContent>
        </Select>
    )
}
