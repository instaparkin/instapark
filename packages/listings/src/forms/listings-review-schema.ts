import z from "zod";

export const listingsReviewSchema = z.object({
    reviewId: z.string(),
    listingId: z.string(),
    location: z.number().int().min(1).max(5),
    cleanliness: z.number().int().min(1).max(5),
    communication: z.number().int().min(1).max(5),
    value: z.number().int().min(1).max(5),
    accuracy: z.number().int().min(1).max(5),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})