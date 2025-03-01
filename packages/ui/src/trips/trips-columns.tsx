"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"
import { BookingsBuyer } from "../__generated__/graphql"
import { formatPrice } from "../utils/field-name"
import { ListingMini } from "../components/listing-mini"
import { Listing } from "@instapark/types"

export const columns: ColumnDef<BookingsBuyer>[] = [
    {
        id: "bookingId",
        accessorKey: "booking.id",
        header: "Booking Id",
    },
    {
        accessorKey: "listing",
        header: "Listing",
        cell: ({ cell }) => {
            const value = cell.getValue() as Listing;
            return (
                <ListingMini listing={value}/>
            )
        }
    },
    {
        accessorKey: "booking.totalPrice",
        header: "Total",
        cell: ({ cell }) => {
            return (
                <div>
                    {formatPrice(cell.getValue() as number)}
                </div>
            )
        }
    },
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
            const value = cell.getValue();
            return (
                <div>
                    {unixSecToMonthYearTime(value as unknown as number)}
                </div>
            )
        }
    },
    {
        accessorKey: "booking.endDate",
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
