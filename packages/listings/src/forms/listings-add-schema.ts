import { z } from "zod";
import { Vehicle, PlaceType } from "@prisma/client"

export const listingsAddSchema = z.object({
    listingId: z.string().uuid(),
    userId: z.string(),
    isOpen: z.boolean(),
    place: z.object({
        placeId: z.string().uuid(),
        type: z.nativeEnum(PlaceType, { message: "Place type is required" }),
    }),
    location: z.object({
        locationId: z.string().uuid(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
        country: z.string(),
        state: z.string(),
        district: z.string(),
        city: z.string(),
        street: z.string(),
        pincode: z.coerce.number({ message: "Pincode is required" }).int(),
        name: z.string().nullish(),
        landmark: z.string().nullish(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date()
    }),
    photos: z.array(z.object({
        photoId: z.string().uuid(),
        listingId: z.string().uuid(),
        url: z.string(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date()
    })).min(4).max(8),
    allowedVehicles: z.array(z.object({
        id: z.string().uuid(),
        listingId: z.string().uuid(),
        vehicle: z.nativeEnum(Vehicle)
    })).max(3),
    pricing: z.object({
        pricingId: z.string().uuid(),
        basePrice: z.coerce.number().min(10.00),
        pphbi: z.coerce.number().min(10.00),
        pphcy: z.coerce.number().min(5.00),
        pphcr: z.coerce.number().min(20.00),
        plph: z.coerce.number().min(60.00),
    }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})