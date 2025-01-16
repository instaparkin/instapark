import { z } from "zod";

export const wishListCreateSchema = z.object({
    name: z.string()
})