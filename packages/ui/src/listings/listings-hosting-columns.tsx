"use client"

import { Listing } from "@instapark/types"
import { ColumnDef } from "@tanstack/react-table"
import { unixSecToMonthYearTime } from "../utils/dayjs"

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
    cell: ({ cell }) => {
      return (
        <div>
          {unixSecToMonthYearTime(cell.getValue())}
        </div>
      )
    }
  },
]
