"use client"

import React from 'react'
import { useAuth } from '../hooks/use-auth'
import { useMutation } from '@apollo/client'
import { Group, SidebarForm } from '../components/sidebar-form'
import { ListingCreateForm, ListingsAddType } from '../forms/listing-create-form'
import { ListingsAddPlaceType } from './listings-add-place-type'
import { ListingsAddLocation } from './listings-add-location'
import { ListingsAddPhotos } from './listings-add-photos'
import { UPDATE_LISTING } from '../graphql/update-listings'
import toast from 'react-hot-toast'
import { ListingsAddAllowedVehicles } from './listings-add-allowed-vehicles'

interface ListingHostDetailedProps {
    listingId: string
}

export const ListingHostDetailed = ({ listingId }: ListingHostDetailedProps) => {
    const { userId } = useAuth();
    const { form } = ListingCreateForm({ defaultValues: true })
    const listingsEditFormSteps: Group<ListingsAddType>[] = [
        {
            title: "Place Type",
            component: ({ form }) => <ListingsAddPlaceType form={form} />,
            fields: [
                {
                    name: "type",
                    description: "Select the type of place (e.g., apartment, house, villa, etc.)."
                }
            ]
        },
        {
            title: "Vehicles",
            component: ({ form }) => <ListingsAddAllowedVehicles form={form} />,
            fields: []
        },
        {
            title: "Location",
            component: ({ form }) => <ListingsAddLocation form={form} />,
            fields: [
                {
                    name: "country",
                    description: "Enter the country where the property is located."
                },
                {
                    name: "state",
                    description: "Specify the state or region of the property."
                },
                {
                    name: "district",
                    description: "Provide the district name for more precise location details."
                },
                {
                    name: "city",
                    description: "Enter the city where the property is situated."
                },
                {
                    name: "street",
                    description: "Provide the street name and number (if applicable)."
                },
                {
                    name: "pincode",
                    description: "Enter the postal or ZIP code of the location."
                },
                {
                    name: "name",
                    description: "Specify the name of the place, such as a building or community name."
                },
                {
                    name: "landmark",
                    description: "Mention a nearby landmark to help identify the location."
                }
            ]
        },
        {
            title: "Photos",
            component: ({ form }) => <ListingsAddPhotos form={form} />,
            fields: [
                {
                    name: "photos",
                    description: "Upload images of the property to showcase its features."
                }
            ]
        },
        {
            title: "Pricing",
            fields: [
                {
                    name: "basePrice",
                    description: "Set the base price for renting or selling the property."
                },
                {
                    name: "pphbi",
                    description: "Price per hour for business inquiries (if applicable)."
                },
                {
                    name: "pphcr",
                    description: "Price per hour for corporate rentals."
                },
                {
                    name: "pphcy",
                    description: "Price per hour for casual stays or short-term rentals."
                },
                {
                    name: "plph",
                    description: "Long-term lease price per hour (if available)."
                }
            ]
        }
    ]

    const [updateListing] = useMutation(UPDATE_LISTING, {
        onCompleted: (data) => {
            toast.success(data?.ListingMutation?.updateListing as string)
        },
        onError: (error) => {
            toast.error(`${error}`)
        }
    })

    return (
        <SidebarForm
            form={form}
            groups={listingsEditFormSteps}
            onSubmit={(data) => {
                updateListing({ variables: { ...data, id: listingId } });
            }} />
    )
}
