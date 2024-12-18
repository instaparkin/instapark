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
import { SearchFilterComponent } from './search-filter-component';
import { Button } from '../components/button';

export const SearchListingsFilter = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className=''>
                    <TbFilterSearch />
                    <span className='text-sm font-semibold'>Filters</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center border-b pb-4'>Filters</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <SearchFilterComponent title='Type of place'>
                        a
                    </SearchFilterComponent>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    )
}
