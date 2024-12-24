import z from "zod";
import { Vehicle, PlaceType } from "@prisma/client"

export const listingsAddSchema = z.object({
    listingId: z.string().uuid().optional(),
    userId: z.string(),
    isOpen: z.boolean(),
    place: z.object({
        placeId: z.string().uuid().optional(),
        type: z.nativeEnum(PlaceType, { message: "Place type is required" }),
    }),
    location: z.object({
        locationId: z.string().uuid().optional(),
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
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional()
    }),
    photos: z.array(z.object({
        photoId: z.string().uuid().optional(),
        listingId: z.string().uuid().optional(),
        url: z.string(),
        createdAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional()
    })).min(4).max(8),
    allowedVehicles: z.array(z.object({
        id: z.string().uuid().optional(),
        listingId: z.string().uuid().optional(),
        vehicle: z.nativeEnum(Vehicle)
    })).max(3),
    pricing: z.object({
        pricingId: z.string().uuid().optional(),
        basePrice: z.coerce.number().min(10.00),
        pphbi: z.coerce.number().min(10.00),
        pphcy: z.coerce.number().min(5.00),
        pphcr: z.coerce.number().min(20.00),
        plph: z.coerce.number().min(60.00),
    }),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional()
})