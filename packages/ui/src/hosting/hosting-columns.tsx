"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/dropdown-menu"
import { Button } from "../components/button"
import { MoreHorizontal } from "lucide-react"
import {  HostBooking } from "../__generated__/graphql"
import { formatPrice } from "../utils/field-name"

export const columns: ColumnDef<HostBooking>[] = [
    {
        accessorKey: "booking.status",
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
                        <div className="bg-lime-200 text-lime-700 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
                case "OnGoing":
                    return (
                        <div className="bg-yellow-200 text-yellow-700 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
            }
        }
    },
    {
        accessorKey: "booking.startDate",
        header: "Start Date",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {unixSecToMonthYearTime(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "booking.endDate",
        header: "End Date ",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {unixSecToMonthYearTime(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "booking.basePrice",
        header: "Base Price",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "booking.totalPrice",
        header: "Total Price",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "booking.parkingPrice",
        header: "Parking Price",
        cell: ({ cell }) => {
            const value = cell.getValue() as number;
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
]
