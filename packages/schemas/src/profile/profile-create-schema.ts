import { AuthMetadata } from "@instapark/types";
import { z, ZodType } from "zod";

export const fullNameSchema = z.object({
    userId: z.string().uuid(),
    firstname: z.string(),
    lastname: z.string()
})

export const legalNameSchema = z.object({
    first_name: z.string({ message: "First name is required" }).min(1),
    last_name: z.string({ message: "Last name is required" }).optional()
}) satisfies ZodType<Pick<AuthMetadata, "first_name" | "last_name">>

export const preferredFirstnameSchema = z.object({
    preferred_first_name: z.string({ message: "Enter your preferred first name" })
}) satisfies ZodType<Pick<AuthMetadata, "preferred_first_name">>
