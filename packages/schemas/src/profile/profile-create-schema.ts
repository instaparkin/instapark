import { ProfileRequest } from '@instapark/types';
import { z, ZodType } from 'zod';

export const profileSchema = z.object({
	firstName: z.string(),
	lastName: z.string().optional(),
	email: z.string(),
	phoneNumber: z.string(),
	kyc: z
		.object({
			uidai: z.string().optional(),
		})
		.optional(),
	country: z.string().optional(),
	state: z.string().optional(),
	district: z.string().optional(),
	city: z.string().optional(),
	street: z.string().optional(),
	pincode: z.coerce.number().int().optional(),
	name: z.string().optional().optional(),
	landmark: z.string().optional().optional(),
}) satisfies ZodType<ProfileRequest>;
