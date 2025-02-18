import React from 'react'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/form'
import { listingsSearchForm, ListingsSearchFormType } from '../forms/listings-search-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select'
import { Vehicle } from '@instapark/types'
import { dateToUnixSec } from '../utils/dayjs'
import axios from 'axios'
import { useIsMobile } from '../hooks/use-mobile'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "../components/drawer"


export const SearchBarMain = () => {
    const form = listingsSearchForm()

    const isMobile = useIsMobile()

    const onSubmit = (values: ListingsSearchFormType) => {
        const startDate = dateToUnixSec(values.startDate as unknown as Date)
        const endDate = dateToUnixSec(values.endDate as unknown as Date)

        axios.get(`http://localhost:8087/listings/listings/all?startDate=${startDate}&endDate=${endDate}&street=${values.street}&vehicleType=${values.vehicleType}`)
            .then(res => {
                console.log(res.data);
            })
    }

    if (isMobile) {
        return (
            <Form {...form}>
                <form className='my-8 mb-10 flex items-center mx-auto justify-center gap-2 border p-4 w-fit rounded-md' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className='w-full' placeholder={`Search by ${field.name}`} type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant={"outline"}>
                                Filters
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className='flex flex-col gap-6 p-4'>
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Start Date"}</FormLabel>
                                        <FormControl>
                                            <Input className='h-12' type="datetime-local" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"End Date"}</FormLabel>
                                        <FormControl>
                                            <Input className='h-12' type="datetime-local" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vehicleType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Vehicle Type"}</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="md:w-[120px]">
                                                    <SelectValue placeholder="Vehicle Type" />
                                                </SelectTrigger>
                                                <SelectContent className='flex'>
                                                    {
                                                        Object.keys(Vehicle).map(v => (
                                                            <SelectItem key={v} className='cursor-pointer w-full' value={v}>
                                                                {v}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>Search</Button>
                        </DrawerContent >
                    </Drawer >
                </form>
            </Form >
        )
    }
    return (
        <Form {...form}>
            <form className='my-8 mb-10 flex items-center mx-auto justify-center gap-2 border p-4 w-fit rounded-md' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={`Search by ${field.name}`} type="text" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="md:w-[120px]">
                                        <SelectValue placeholder="Vehicle Type" />
                                    </SelectTrigger>
                                    <SelectContent className='flex'>
                                        {
                                            Object.keys(Vehicle).map(v => (
                                                <SelectItem key={v} className='cursor-pointer w-full' value={v}>
                                                    {v}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Search</Button>
            </form>
        </Form>
    )
}

