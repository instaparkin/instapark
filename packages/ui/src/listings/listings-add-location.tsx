"use client";

import { ListingsAddType } from '@instapark/listings';
import React, { useEffect } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { RootState, useSelector } from '@instapark/state';
import { MapsSearch } from '../maps/maps-search';
import { ListingsFormField } from './listings-form-field';
import dynamic from "next/dynamic";
import { Skeleton } from '../components/skeleton';
import path from 'path';
import { MapData } from '@instapark/state/src/slices/maps-slice';

const MapDynamic = dynamic(() =>
    import('../maps/maps-main').then((mod) => mod.MapsMain), {
    loading: () => (
        <Skeleton className='w-full h-[90vh]' />
    )
}
);

interface FieldsToUpdateProps {
    path: Path<ListingsAddType>;
    value: string | number;
}

export const ListingsAddLocation = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {
    const { autocomplete } = useSelector((state: RootState) => state.maps);

    useEffect(() => {
        async function trigger() {
            const paths: Path<ListingsAddType>[] = [
                "location.latitude",
                "location.longitude",
                "location.country",
                "location.state",
                "location.district",
                "location.city",
                "location.street",
                "location.pincode",
                "location.name",
                "location.landmark"
            ];
            await form.watch(paths);
            await form.trigger(paths);
        }
        trigger();
    }, [autocomplete, form.getValues]);

    const handleLocationUpdate = (location: MapData) => {
        const fieldsToUpdate: FieldsToUpdateProps[] = [
            { path: "location.latitude", value: location?.lat as number },
            { path: "location.longitude", value: location?.lng as number },
            { path: "location.country", value: location?.country as string },
            { path: "location.state", value: location?.state as string },
            { path: "location.district", value: location?.district as string },
            { path: "location.city", value: location?.taluk as string },
            { path: "location.street", value: location?.street as string },
            { path: "location.pincode", value: location?.pincode as string },
        ];

        for (const field of fieldsToUpdate) {
            form.setValue(field.path, field.value, {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    };

    return (
        <div className='space-y-4 max-w-[630px] mx-auto'>
            <MapsSearch
                onLocationClick={handleLocationUpdate}
            />
            <MapDynamic id="ListingsAddLocation" />
            <ListingsFormField
                form={form}
                name="location.country"
                value={form.getValues("location.country")}
            />
            <ListingsFormField
                form={form}
                name="location.state"
                value={form.getValues("location.state")}
            />
            <ListingsFormField
                form={form}
                name="location.district"
                value={form.getValues("location.district")}
            />
            <ListingsFormField
                form={form}
                name="location.city"
                value={form.getValues("location.city")}
            />
            <ListingsFormField
                form={form}
                name="location.street"
                value={form.getValues("location.street")}
            />
            <ListingsFormField
                form={form}
                name="location.pincode"
                value={form.getValues("location.pincode") as number}
            />
            <ListingsFormField
                form={form}
                name="location.name"
                value={form.getValues("location.name") as string}
            />
            <ListingsFormField
                form={form}
                name="location.landmark"
                value={form.getValues("location.landmark") as string}
            />
            <ListingsFormField
                form={form}
                name="location.latitude"
                value={form.getValues("location.latitude")?.toString()}
            />
            <ListingsFormField
                form={form}
                name="location.longitude"
                value={form.getValues("location.longitude")?.toString()}
            />
        </div>
    );
};
