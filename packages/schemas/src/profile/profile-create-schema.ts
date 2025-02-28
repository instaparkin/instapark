import { ProfileRequest } from "@instapark/types";
import { z, ZodType } from "zod";

export const profileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emails: z.string(),
    phoneNumber: z.string(),
    kyc: z.object({
        uidai: z.string(),
    }),
    country: z.string(),
    state: z.string(),
    district: z.string(),
    city: z.string(),
    street: z.string(),
    pincode: z.coerce.number().int(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    name: z.string().optional(),
    landmark: z.string().optional(),
}) satisfies ZodType<ProfileRequest>