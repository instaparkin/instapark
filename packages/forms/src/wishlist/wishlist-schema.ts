import { z } from "zod";

export const wishListSchema = z.object({
    name: z.string()
})