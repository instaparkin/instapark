"use client"

import { Booking } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/dropdown-menu"
import Link from "next/link"

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
        cell: ({ row }) => {
            const bookingId = row.original.id
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/reservations/${bookingId}`}>
                            <DropdownMenuItem>
                                View
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>OTP</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
