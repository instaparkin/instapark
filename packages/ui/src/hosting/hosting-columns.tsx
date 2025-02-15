"use client"

import { Booking } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"

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
