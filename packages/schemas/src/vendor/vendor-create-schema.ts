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
        ifsc: z.string()
            .regex(new RegExp("^[A-Z]{4}0[A-Z0-9]{6}$"
            ), "Please Enter a valid IFSC code"),
    }),
    kyc_details: z.object({
        pan: z.string().
            regex(
                new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
                "Please enter a valid PAN card"),
    })
}) satisfies ZodType<VendorRequest>