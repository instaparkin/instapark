import { z } from "zod";

export const createPaymentSchema = z.object({
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.string(),
    phone: z.string(),
});