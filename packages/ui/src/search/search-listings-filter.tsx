"use client"

import React, { ReactNode, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../components/drawer"
import { ScrollArea } from '../components/scroll-area'
import { Button } from '../components/button'
import { SearchFilterPrice } from './search-filter-price'
import { SlidersHorizontal } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/accordion"
import { SearchFilter } from './search-filter'
import { Tabs, TabsList, TabsTrigger } from '../components/tabs'
import { Vehicle } from '@instapark/types'
import { FaMotorcycle, FaCarAlt } from "react-icons/fa"
import { LiaBicycleSolid } from "react-icons/lia"
import { RatingMenu } from './search-rating-menu'

const vehicles: Record<Vehicle, ReactNode> = {
    Bike: <FaMotorcycle className='w-6 h-6' />,
    Car: <FaCarAlt className='w-6 h-6' />,
    Cycle: <LiaBicycleSolid className='w-6 h-6' />
}

type SearchListingsFilterProps = {
    ClearFilters?: ReactNode
}

const FilterContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
    <>
        <ScrollArea className='h-[calc(100vh-200px)] sm:h-72 md:h-96 px-4'>
            <SearchFilter title='Allowed Vehicles'>
                <Tabs>
                    <TabsList className='grid grid-cols-3 gap-1'>
                        {Object.keys(vehicles).map((v, index) => {
                            const vehicle = v as Vehicle
                            return (
                                <TabsTrigger key={index} value={vehicle}>
                                    {vehicles[vehicle]}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>
                </Tabs>
            </SearchFilter>
            <SearchFilterPrice />
            <Accordion type="single" collapsible>
                <AccordionItem className='border-none' value="item-1">
                    <AccordionTrigger className='text-lg'>Host Language</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem className='border-none' value="item-1">
                    <AccordionTrigger className='text-lg'>Property Type</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem className='border-none' value="item-1">
                    <AccordionTrigger className='text-lg'>Ratings</AccordionTrigger>
                    <AccordionContent>
                        <RatingMenu attribute='rating' />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </ScrollArea>
        <div className="flex w-full justify-between border-t pt-4 p-4">
            <Button variant="outline" onClick={onClose}>Clear</Button>
            <Button onClick={onClose}>Apply</Button>
        </div>
    </>
)

export const SearchListingsFilter: React.FC<SearchListingsFilterProps> = ({ ClearFilters }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)

    const triggerButton = (
        <Button
            variant="outline"
            className="h-[46px] px-4 rounded-none border border-input hover:bg-accent hover:text-accent-foreground w-fit"
        >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span className="text-sm hidden md:block">Filters</span>
        </Button>
    )

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {triggerButton}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center border-b pb-4">Filters</DialogTitle>
                    </DialogHeader>
                    <FilterContent onClose={handleClose} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {triggerButton}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center border-b pb-4">Filters</DrawerTitle>
                </DrawerHeader>
                <FilterContent onClose={handleClose} />
            </DrawerContent>
        </Drawer>
    )
}

