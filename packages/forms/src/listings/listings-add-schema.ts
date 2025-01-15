import { z, ZodType } from "zod";
import { Listing, PlaceType, Vehicle } from "@instapark/types"

export const listingsAddSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    type: z.custom<PlaceType>(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    country: z.string(),
    state: z.string(),
    district: z.string(),
    city: z.string(),
    street: z.string(),
    pincode: z.coerce.number({ message: "Pincode is required" }).int(),
    name: z.string().optional(),
    landmark: z.string().optional(),
    /**Photos is a separate Table  */
    photos: z.array(z.object({
        listingId: z.string().uuid(),
        url: z.string(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date()
    })).min(4).max(8),
    /**Allowed Vehicles is a separate Table  */
    allowedVehicles: z.array(z.object({
        listingId: z.string().uuid(),
        vehicle:  z.custom<Vehicle>()
    })).max(3),
    basePrice: z.coerce.number().min(10.00),
    pphbi: z.coerce.number().min(10.00),
    pphcy: z.coerce.number().min(5.00),
    pphcr: z.coerce.number().min(20.00),
    plph: z.coerce.number().min(60.00),
    isOpen: z.boolean(),
    na_start_date : z.coerce.date().optional(),
    na_end_date : z.coerce.date().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
}) satisfies ZodType<Listing>