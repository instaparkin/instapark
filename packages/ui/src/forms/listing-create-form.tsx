"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { listingsCreateSchema } from '@instapark/schemas'
export type ListingsAddType = z.infer<typeof listingsCreateSchema>;

export const ListingCreateForm = () =>
    useForm<ListingsAddType>({
        resolver: zodResolver(listingsCreateSchema),
        defaultValues: {
            userId: "",
            isOpen: true,
            type: "",
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
            allowedVehicles: [],
            photos: [],
            basePrice: 0,
            pphbi: 0,
            pphcy: 0,
            pphcr: 0,
            plph: 0,
        },
    });
