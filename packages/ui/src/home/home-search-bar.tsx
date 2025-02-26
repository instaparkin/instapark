"use client"

import React from "react"
import { SheetContent } from "../components/sheet"
import { Button } from "../components/button"
import { SheetTrigger } from "../components/sheet"
import { Sheet } from "../components/sheet"
import { Form } from "../components/form"
import { SelectItem } from "../components/select"
import { SelectContent } from "../components/select"
import { SelectValue } from "../components/select"
import { SelectTrigger } from "../components/select"
import { Select } from "../components/select"
import { Input } from "../components/input"
import { FormControl } from "../components/form"
import { FormLabel } from "../components/form"
import { FormItem } from "../components/form"
import { FormField } from "../components/form"
import { cn } from "../utils/cn"
import { listingsSearchForm } from "../forms/listings-search-form"
import { useIsMobile } from "../hooks/use-mobile"
import { AppDispatch, setSearch, useDispatch } from "@instapark/state"
import { Home, SlidersHorizontal } from "lucide-react"
import { dateToUnixSec } from "../utils/dayjs"
import { ListingSearch } from "@instapark/types"
import { Vehicle } from "../__generated__/graphql"
import { Separator } from "../components/separator"

export const HomeSearchBar = () => {
  const form = listingsSearchForm()
  const isMobile = useIsMobile()
  const dispatch = useDispatch<AppDispatch>()

  const SearchFilters = ({ className }: { className?: string }) => (
    <div className={cn("flex flex-col md:flex-row gap-4 md:gap-2", className)}>
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Street</FormLabel>
            <FormControl>
              <Input placeholder="Search by street" className="h-12 bg-background" type="text" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Start date</FormLabel>
            <FormControl>
              <Input className="h-12 bg-background cursor-pointer" type="datetime-local" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>End date</FormLabel>
            <FormControl>
              <Input className="h-12 bg-background cursor-pointer" type="datetime-local" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vehicleType"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Vehicle</FormLabel>
            <FormControl>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 bg-background">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Select vehicle" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(Vehicle).map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )

  const handleSubmit = (value: ListingSearch) => {
    dispatch(
      setSearch({
        street: value.street,
        vehicleType: value.vehicleType,
        startDate: value.startDate ? dateToUnixSec(new Date(value.startDate)) : undefined,
        endDate: value.endDate ? dateToUnixSec(new Date(value.endDate)) : undefined,
      }),
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="bg-white dark:bg-black rounded-sm border p-2 sm:p-4 mb-10"
        >
          {isMobile ? (
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Search by street" className="h-12" type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <div className="pt-6 space-y-4">
                    <SearchFilters />
                    <Button className="w-full" size="lg" type="submit">
                      Search
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <div className="w-full flex-1">
                <SearchFilters />
              </div>
              <Button size="lg" type="submit" className="w-full md:w-auto h-12">
                Search
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}

