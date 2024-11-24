import z from "zod";

export const listingsNotAvailableDatesSchema = z.array(
    z.object({
        id: z.string(),
        date: z.date(),
        listingId: z.string(),
    }))