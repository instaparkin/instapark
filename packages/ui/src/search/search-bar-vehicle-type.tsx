'use client'

import { Vehicle } from "@instapark/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/select"

export function SearchBarVehicleType() {

    return (
        <Select>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Vehicle Type" />
            </SelectTrigger>
            <SelectContent className='flex'>
                {
                    Object.keys(Vehicle).map(v => (
                        <SelectItem className='cursor-pointer w-full' value={v}>
                            {v}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}
