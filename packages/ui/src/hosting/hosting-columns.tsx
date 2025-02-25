"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/dropdown-menu"
import { Button } from "../components/button"
import { MoreHorizontal } from "lucide-react"
import { Booking } from "../__generated__/graphql"

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
            const value = cell.getValue();
            switch (value) {
                case "Booked":
                    return (
                        <div className="bg-blue-200 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
                case "Completed":
                    return (
                        <div className="bg-lime-200 p-2 w-fit rounded-sm">
                            {value}
                        </div>
                    )
                case "Locked":
                    return (
                        <div className="bg-gray-200 p-2 w-fit rounded-sm">
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
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            Verify
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
