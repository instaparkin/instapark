import { z, ZodType } from "zod";
import { ListingRequest, PlaceType, Vehicle } from "@instapark/types"

export const listingsCreateSchema = z.object({
    userId: z.string(),
    type: z.custom<PlaceType>(),
    country: z.string({ message: "Country is required" }),
    state: z.string({ message: "State is required" }),
    district: z.string({ message: "District is required" }),
    city: z.string({ message: "City is required" }),
    street: z.string({ message: "Street is required" }),
    pincode: z.coerce.number({ message: "Pincode is required" }).int(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    name: z.string().optional(),
    landmark: z.string().optional(),
    /**Allowed Vehicles is a separate Table  */
    allowedVehicles: z.array(z.object({
        vehicle: z.custom<Vehicle>()
    })).max(3),
    basePrice: z.coerce.number().min(10.00),
    pphbi: z.coerce.number().min(10.00),
    pphcy: z.coerce.number().min(5.00),
    pphcr: z.coerce.number().min(20.00),
    plph: z.coerce.number().min(60.00),
    /**Photos is a separate Table  */
    photos: z.array(z.object({
        url: z.string(),
    })).min(4).max(8),
}) satisfies ZodType<ListingRequest>;
