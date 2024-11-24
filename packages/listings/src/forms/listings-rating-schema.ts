import z from "zod";

export const listingsRatingSchema = z.object({
    ratingId: z.string(),
    listingId: z.string(),
    rating: z.number().int().min(1).max(5),
    createdAt: z.date(),
    updatedAt: z.date(),
})