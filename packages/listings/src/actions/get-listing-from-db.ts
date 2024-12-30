"use server"

import { listingsDb } from "../db/listings-db";

interface GetListingFromDbProps {
    listingId: string;
}

export interface Listing {
    listingId: string;
    userId: string;
    isOpen: boolean;
    createdAt: number;
    updatedAt: number;
    type: string;
    country: string;
    state: string;
    district: string;
    city: string;
    street: string;
    pincode: number;
    latitude: number;
    longitude: number;
    name: string;
    landmark: string;
    allowedVehicles: string[];
    basePrice: number;
    pphbi: number;
    pphcy: number;
    pphcr: number;
    plph: number;
    photos: string[];
}

export const getListingFromDb = async ({ listingId }: GetListingFromDbProps): Promise<Listing | null> => {
    const listing = await listingsDb.listing.findUnique({
        where: { listingId },
        select: {
            listingId: true,
            userId: true,
            isOpen: true,
            createdAt: true,
            updatedAt: true,
            place: { select: { type: true } },
            location: {
                select: {
                    country: true,
                    state: true,
                    district: true,
                    city: true,
                    street: true,
                    pincode: true,
                    latitude: true,
                    longitude: true,
                    name: true,
                    landmark: true,
                },
            },
            allowedVehicles: true,
            pricing: {
                select: {
                    basePrice: true,
                    pphbi: true,
                    pphcy: true,
                    pphcr: true,
                    plph: true,
                },
            },
            photos: true,
        },
    });

    console.log(listing);
    

    if (!listing) return null;

    return {
        listingId: listing.listingId,
        userId: listing.userId,
        isOpen: listing.isOpen,
        createdAt: listing.createdAt.getTime(),
        updatedAt: listing.updatedAt.getTime(),
        type: listing.place?.type || "Unknown",
        country: listing.location?.country || "Unknown",
        state: listing.location?.state || "Unknown",
        district: listing.location?.district || "Unknown",
        city: listing.location?.city || "Unknown",
        street: listing.location?.street || "Unknown",
        pincode: listing.location?.pincode || 0,
        latitude: listing.location?.latitude || 0,
        longitude: listing.location?.longitude || 0,
        name: listing.location?.name || "Unknown",
        landmark: listing.location?.landmark || "None",
        allowedVehicles: listing.allowedVehicles?.map(v => v.vehicle) || [],
        basePrice: listing.pricing?.basePrice || 0,
        pphbi: listing.pricing?.pphbi || 0,
        pphcy: listing.pricing?.pphcy || 0,
        pphcr: listing.pricing?.pphcr || 0,
        plph: listing.pricing?.plph || 0,
        photos: listing.photos?.map(p => p.url) || [],
    };
};
