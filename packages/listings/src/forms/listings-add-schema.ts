import z from "zod";
import { AllowedVehicle, PlaceType } from "@prisma/client"

export const listingsAddSchema = z.object({
    userId: z.string().uuid(),
    place: z.object({
        type: z.nativeEnum(PlaceType, { message: "Place type is required" }),
    }),
    location: z.object({
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
        country: z.string(),
        state: z.string(),
        district: z.string(),
        city: z.string(),
        street: z.string(),
        pincode: z.coerce.number().int(),
        house: z.string().nullish(),
        landmark: z.string().nullish(),
    }),
    photos: z.array(z.object({
        url: z.string(),
    })).min(4).max(8),
    allowedVehicles: z.array(z.nativeEnum(AllowedVehicle)).max(3),
    isOpen: z.boolean(),
    pricing: z.object({
        basePrice: z.coerce.number().min(10.00),
        plph: z.coerce.number().min(60.00),
        pphbi: z.coerce.number().min(10.00),
        pphcr: z.coerce.number().min(20.00),
        pphcy: z.coerce.number().min(5.00),
    }),

})