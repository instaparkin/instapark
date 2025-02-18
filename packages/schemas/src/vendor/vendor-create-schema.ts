import { VendorRequest } from "@instapark/types";
import z, { ZodType } from "zod";

export const VendorCreateSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.number(),
    bank: z.object({
        account_number: z.number(),
        account_holder: z.string(),
        ifsc: z.string(),
    }),
    kyc_details: z.object({
        pan: z.string(),
    })
}) satisfies  ZodType<VendorRequest>