import { VendorRequest } from "@instapark/types";
import z, { ZodType } from "zod";

export const VendorCreateSchema = z.object({
    vendor_id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.coerce.string(),
    bank: z.object({
        account_number: z.coerce.string(),
        account_holder: z.string(),
        ifsc: z.string(),
    }),
    kyc_details: z.object({
        pan: z.string(),
    })
}) satisfies ZodType<VendorRequest>