"use client"

import React from "react"
import { Booking, Listing, Payment } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/dropdown-menu"
import Link from "next/link"
import { formatLocation } from "../utils/field-name"

export const columns: ColumnDef<Booking & { payments: Payment[], listing: Listing }>[] = [
    {
        accessorKey: "id",
        header: "Booking Id",
    },
    {
        accessorKey: "listing",
        header: "Location",
        cell: ({ cell }) => {
            const value: Listing = cell.getValue() as Listing;
            return (
                <div className="flex items-center gap-4">
                    {formatLocation(
                        value.country,
                        value.state,
                        value.district,
                        value.city,
                        value.street,
                        value.pincode,
                        false)}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
            const value = cell.getValue();
            switch (value) {
                case "Booked":
                    return (
                        <div className="bg-blue-200 text-blue-700  p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
                case "Completed":
                    return (
                        <div className="bg-lime-200 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
                case "OnGoing":
                    return (
                        <div className="bg-yellow-200 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
            }
        }
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ cell }) => {
            const value = cell.getValue();
            return (
                <div>
                    {unixSecToMonthYearTime(value as unknown as number)}
                </div>
            )
        }
    },
    {
        accessorKey: "endDate",
        header: "End Date ",
        cell: ({ cell }) => {
            const value = cell.getValue();
            return (
                <div>
                    {unixSecToMonthYearTime(value as unknown as number)}
                </div>
            )
        }
    },
]
