"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { listingsAddSchema } from "./listings-add-schema";
import z from "zod";

export type ListingsAddType = z.infer<typeof listingsAddSchema>;

export const ListingsAddForm = () =>
    useForm<ListingsAddType>({
        resolver: zodResolver(listingsAddSchema),
        defaultValues: {
            id: "",
            userId: "",
            isOpen: true,
            type: "House",
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
            allowedVehicles: [
            ],
            photos: [],
            basePrice: 0,
            pphbi: 0,
            pphcy: 0,
            pphcr: 0,
            plph: 0,
            na_start_date: undefined,
            na_end_date: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
