"use client"

import React from "react"
import { Button } from "../components/button"
import { Form, FormControl, FormField, FormItem } from "../components/form"
import { Input } from "../components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Sheet, SheetContent, SheetTrigger } from "../components/sheet"
import { listingsSearchForm } from "../forms/listings-search-form"
import { useIsMobile } from "../hooks/use-mobile"
import { Search, SlidersHorizontal } from 'lucide-react'
import { Listing, ListingSearch, Vehicle } from "@instapark/types"
import { cn } from "../utils/cn"
import { AppDispatch, setSearch, useDispatch } from "@instapark/state"
import { dateToUnixSec } from "../utils/dayjs"

export const HomeSearchBar = () => {
    const form = listingsSearchForm()
    const isMobile = useIsMobile()

    const dispatch = useDispatch<AppDispatch>();

    const SearchFilters = ({ className }: { className?: string }) => (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input min={new Date().toISOString().slice(0, 16)} type="datetime-local" {...field} className="bg-background" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input min={new Date().toISOString().slice(0, 16)} type="datetime-local" {...field} className="bg-background" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(Vehicle).map((v) => (
                                        <SelectItem className="cursor-pointer" key={v} value={v}>
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
        dispatch(setSearch({
            street: value.street,
            vehicleType: value.vehicleType,
            startDate: dateToUnixSec(new Date(value.startDate as string)),
            endDate: dateToUnixSec(new Date(value.endDate as string)),
        }))
    }

    return (
        <div className="relative min-h-[400px] w-full bg-muted mb-10 rounded-lg ">
            <div className="container mx-auto px-4">
                <div className="pt-20 pb-10 text-center text-instapark">
                    <h1 className="text-2xl md:text-4xl font-light mb-2">Just park it</h1>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Form {...form}>
                        <form className="rounded-xl bg-muted/80 backdrop-blur-sm p-4" onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="flex items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Search by street"
                                                        className="pl-10 bg-background"
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {isMobile ? (
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <SlidersHorizontal className="h-4 w-4" />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side={"bottom"}>
                                            <div className="h-full pt-6">
                                                <SearchFilters />
                                                <Button className="w-full mt-4">
                                                    Search
                                                </Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                ) : (
                                    <Button variant={"outline"} className="px-8">
                                        Search
                                    </Button>
                                )}
                            </div>

                            {!isMobile && (
                                <div className="mt-4">
                                    <SearchFilters />
                                </div>
                            )}
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
