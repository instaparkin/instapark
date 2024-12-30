import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/dialog"
import { TbFilterSearch } from "react-icons/tb";
import { ScrollArea } from '../components/scroll-area';
import { SearchFilter } from './search-filter';
import { Button } from '../components/button';
import { SearchFilterPrice } from './search-filter-price';
import { SearchFilterVehicle } from './search-filter-vehicle';
import { SlidersHorizontal } from 'lucide-react';

export const SearchListingsFilter = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className='py-6'>
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <span className='text-sm'>Filters</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center border-b pb-4'>Filters</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <SearchFilterVehicle />
                    <SearchFilterPrice />
                </ScrollArea>
            </DialogContent>
        </Dialog>

    )
}
