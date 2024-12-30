"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { listingsAddSchema } from "./listings-add-schema";
import z from "zod";
import { v4 as uuid } from "uuid";

/**
 * Listing ID is generated to be referenced later for other schemas
 */
const listingId = uuid();

export type ListingsAddType = z.infer<typeof listingsAddSchema>;

export const ListingsAddForm = () =>
    useForm<ListingsAddType>({
        resolver: zodResolver(listingsAddSchema),
        defaultValues: {
            listingId: listingId,
            userId: "",
            isOpen: true,
            place: {
                placeId: listingId,
                type: "House",
            },
            location: {
                locationId: listingId,
                latitude: 0,
                longitude: 0,
                country: "",
                state: "",
                district: "",
                city: "",
                street: "",
                pincode: 0,
                name: "",
                landmark: "",
                createdAt : new Date(),
                updatedAt : new Date()
            },
            allowedVehicles: [
                {
                    id: uuid(),
                    listingId: listingId,
                    vehicle: "Bike",
                },
            ],
            photos: [],
            pricing: {
                pricingId: listingId,
                basePrice: 0,
                pphbi: 0,
                pphcy: 0,
                pphcr: 0,
                plph: 0,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
