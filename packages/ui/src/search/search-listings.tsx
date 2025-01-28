"use client"

import * as React from "react"
import { Autocomplete } from "./search-autocomplete"
import { SearchListingsFilter } from "./search-listings-filter"
import { DateRangeFilter } from "./date-picker"

export function SearchHeader() {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-center">

      <div className="flex-[2] max-w-[300px]">
        <Autocomplete />
      </div>

      <SearchListingsFilter />
    </div>
  )
}

