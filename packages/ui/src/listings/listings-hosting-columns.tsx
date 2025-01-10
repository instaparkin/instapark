"use client"

import { Listing } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated ",
  },
]
