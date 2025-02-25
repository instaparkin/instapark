import { ListingSearch, Vehicle } from "@instapark/types";
import z, { ZodType } from "zod";

export const listingsSearchSchema = z.object({
    street: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    vehicleType : z.custom<Vehicle>()
}) satisfies ZodType<ListingSearch>