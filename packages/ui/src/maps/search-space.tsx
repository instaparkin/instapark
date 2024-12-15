"use client"

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../components/dialog";
import { Card, CardDescription } from '../components/card';
import { FlyToButton } from './fly-to-button';
import { AppDispatch, fetchGeoLocations, RootState, useDispatch, useSelector } from '@instapark/state';
import { SearchInput } from '../components/search-input';
import { IoLocationOutline } from 'react-icons/io5';
import { useDebouncedValue } from '@mantine/hooks';

export const SearchSpace = () => {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [debounced] = useDebouncedValue(value, 1000);

    const { geoLocations: locations } = useSelector((state: RootState) => state.maps);

    useEffect(() => {
        dispatch(fetchGeoLocations(`https://photon.komoot.io/api/?q=${debounced}&limit=5`));
    }, [value]);

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onLocationClick = (location: string, latitude: number, longitude: number) => {
        if (location) {
            setValue(location);
            dispatch(fetchGeoLocations(`https://photon.komoot.io/reverse?lon=${longitude}&lat=${latitude}`));
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='w-full'>
                <SearchInput defaultValue={value} placeholder="Search Space" />
            </DialogTrigger>
            <DialogContent className="p-0">
                <SearchInput
                    className='fixed top-0 left-0 z-10'
                    defaultValue={value}
                    type="text"
                    onChange={onValueChange}
                    placeholder="Search Space"
                />
                <div className='p-2 grid gap-2 max-h-[85vh] overflow-y-auto pt-10'>
                    {locations.map((location, index) => {
                        return (
                            <Card
                                onClick={() =>
                                    onLocationClick(
                                        location.properties?.name,
                                        location.geometry.coordinates[1] as number,
                                        location.geometry.coordinates[0] as number)}
                                className="p-0 cursor-pointer"
                                key={index}
                            >
                                <FlyToButton flyTo={location.geometry.coordinates as [number, number]}>
                                    <CardDescription className="flex items-center gap-4 w-full p-4">
                                        <div className="border p-4 bg-accent rounded-lg flex items-center justify-center">
                                            <IoLocationOutline />
                                        </div>
                                        <div className="flex flex-wrap gap-1 leading-tight line-clamp-2">
                                            {[
                                                location?.properties?.name,
                                                location?.properties?.city,
                                                location?.properties?.state,
                                                location?.properties?.country,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </div>
                                    </CardDescription>
                                </FlyToButton>
                            </Card>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};
