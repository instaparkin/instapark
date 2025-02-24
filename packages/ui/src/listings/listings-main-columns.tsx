import { Listing } from "@instapark/types";
import { ColumnDef } from "@tanstack/react-table";

export const listingMainColumns: ColumnDef<Listing>[] = [
    {
        accessorKey: "id",
        header: "Listing Id"
    },
    // {
    //     accessorKey: "isOpen",
    //     header: "STATUS"
    // },
    // {
    //     accessorKey: "street",
    //     header: "Location"
    // }
]