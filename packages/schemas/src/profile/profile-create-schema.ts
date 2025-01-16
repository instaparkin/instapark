import { z } from "zod";

export const fullNameSchema = z.object({
    userId: z.string().uuid(),
    firstname: z.string(),
    lastname: z.string()
})