import React from "react"
import { ColumnDef } from "@tanstack/react-table";
import { Listing } from "../__generated__/graphql";
import { cn } from "../utils/cn";
import { timeInInstapark } from "../utils/dayjs";
import Image from "next/image";
import { formatPrice } from "../utils/field-name";

export const listingMainColumns: ColumnDef<Listing>[] = [
    {
        accessorKey: "photos",
        header: "Listing",
        cell: ({ cell }) => {
            const value = cell.getValue() as string[]
            return (
                <div className="relative w-20 h-20 flex-shrink-0 sm:w-24 sm:h-24">
                    {/* <Image
                        fill
                        src={value.at(0) as string}
                        alt={`Listing Photo`}
                        className="object-cover rounded-lg border"
                    /> */}
                </div>
            )
        }
    },
    {
        id: "id",
        accessorKey: "id",
        header: "Listing Id",
        cell: ({ cell }) => {
            return (
                <div className="w-20 line-clamp-1">
                    {cell.getValue() as string}
                </div>
            )
        }
    },
    {
        accessorKey: "city",
        header: "City"
    },
    {
        accessorKey: "street",
        header: "Street",
    },
    {
        accessorKey: "pincode",
        header: "Pincode"
    },
    {
        accessorKey: "basePrice",
        header: "Base Price",
        cell: ({ cell }) => {
            const value = cell.getValue() as number
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "pphbi",
        header: "Bike",
        cell: ({ cell }) => {
            const value = cell.getValue() as number
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "pphcr",
        header: "Car",
        cell: ({ cell }) => {
            const value = cell.getValue() as number
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "pphcy",
        header: "Cycle",
        cell: ({ cell }) => {
            const value = cell.getValue() as number
            return (
                <div>
                    {formatPrice(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "isOpen",
        header: "Status",
        cell: ({ cell }) => {
            const value = cell.getValue() as string
            return (
                <div className={cn(value.toString() === "true" ? "bg-lime-200 text-lime-700 p-2" : "bg-red-200 text-red-700 p-2", "w-fit rounded-sm")} >
                    {value.toString() === "true" ? "Open" : "Close"}
                </div>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Last updated",
        cell: ({ cell }) => {
            const value = cell.getValue() as number
            return (
                <div>
                    {timeInInstapark(value, false)}
                </div>
            )
        }
    }
]