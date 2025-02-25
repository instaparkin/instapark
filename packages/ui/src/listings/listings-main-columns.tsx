import React from "react"
import { ColumnDef } from "@tanstack/react-table";
import { Host_ListingsQuery, Listing } from "../__generated__/graphql";
import { cn } from "../utils/cn";

export const listingMainColumns: ColumnDef<Listing>[] = [
    {
        accessorKey: "id",
        header: "Listing Id"
    },
    {
        accessorKey: "isOpen",
        header: "STATUS",
        cell: ({ cell }) => {
            const value = cell.getValue()
            return (
                <div className={cn(`${value} === true? bg-postive : bg-negative`)}>
                    {value}
                </div>
            )
        }
    },
    {
        accessorKey: "rating",
        header: "Ratings"
    },
]