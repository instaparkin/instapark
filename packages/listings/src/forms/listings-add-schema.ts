import z from "zod";
import { PlaceType } from "@prisma/client"

export const listingsAddSchema = z.object({
    listingId: z.string(),
    place: z.object({
        placeId: z.string(),
        name: z.string().nullish(),
        type: z.nativeEnum(PlaceType),
    }),
    photos: z.array(z.object({
        photoId: z.string(),
        listingId: z.string(),
        url: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    })).min(4).max(8),
    location: z.object({
        locationId: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        country: z.string(),
        state: z.string(),
        district: z.string(),
        city: z.string(),
        street: z.string(),
        pinocde: z.number().int(),
        house: z.string().nullish(),
        landmark: z.string().nullish(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),
    isOpen : z.boolean(),
    pricing : z.object({
        pricingId: z.string(),
        basePrice: z.number().min(10.00),
        plph: z.number().min(60.00),
        pphbi: z.number().min(10.00),
        pphcr: z.number().min(20.00),
        pphcy : z.number().min(5.00),
    }),
    allowedVechiles: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
});