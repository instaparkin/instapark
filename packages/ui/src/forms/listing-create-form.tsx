"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { listingsCreateSchema } from "@instapark/schemas";
import { useQuery } from "@apollo/client";
import { HOST_LISTINGS } from "../graphql/host-listings";
import { useAuth } from "../hooks/use-auth";
import { Listing } from "../__generated__/graphql";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export type ListingsAddType = z.infer<typeof listingsCreateSchema>;

export const ListingCreateForm = () => {
    const { userId } = useAuth();
    const { listing } = useParams();
    const { data } = useQuery(HOST_LISTINGS, {
        variables: {
            userId,
            id: listing as string,
        },
    });
    const listingFromDB = data?.ListingQuery?.hostListings?.at(0) as Listing;

    const form = useForm<ListingsAddType>({
        resolver: zodResolver(listingsCreateSchema),
        defaultValues: {
            userId: "",
            latitude: 0,
            longitude: 0,
            country: "India",
            state: "Karnataka",
            district: "Bengaluru",
            city: "Bengaluru",
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

    useEffect(() => {
        if (listingFromDB) {
            form.reset({
                ...listingFromDB,
            });
        }
    }, [listingFromDB]);

    return {
        form
    };
};
