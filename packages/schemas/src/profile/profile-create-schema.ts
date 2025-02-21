import { AuthMetadata, Profile, ProfileRequest } from "@instapark/types";
import { z, ZodType } from "zod";

export const legalNameSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().optional()
}) satisfies ZodType<Pick<AuthMetadata, "first_name" | "last_name">>

export const preferredFirstnameSchema = z.object({
    preferred_first_name: z.string({ message: "Enter your preferred first name" })
}) satisfies ZodType<Pick<AuthMetadata, "preferred_first_name">>

export const profileSchema = z.object({
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