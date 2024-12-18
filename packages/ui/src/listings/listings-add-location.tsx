import { ListingsAddType } from '@instapark/listings'
import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { Map } from '../maps/map-base';
import { RootState, useSelector } from '@instapark/state';
import { SearchSpace } from '../maps/search-space';

export const ListingsAddLocation = ({ form }: { form: UseFormReturn<ListingsAddType> }) => {

  const { geoLocations: locations } = useSelector((state: RootState) => state.maps);

    locations.map((location) => {
        form.setValue("location.latitude", location.geometry.coordinates[1] as number);
        form.setValue("location.longitude", location.geometry.coordinates[0] as number);
        form.setValue("location.country", location.properties?.country);
        form.setValue("location.state", location.properties?.state);
        form.setValue("location.district", location.properties?.district);
        form.setValue("location.city", location.properties?.city);
        form.setValue("location.street", location.properties?.street);
        form.setValue("location.pincode", location.properties?.pincode);
        form.setValue("location.name", location.properties?.house);
        form.setValue("location.landmark", location.properties?.landmark);
    })

    return (
        <div className='space-y-4 max-w-[630px] mx-auto'>
            <SearchSpace />
            <Map id="ListingsAddLocation" />
        </div>
    )
}
