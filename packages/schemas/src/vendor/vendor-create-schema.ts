import { VendorRequest } from '@instapark/types';
import z, { ZodType } from 'zod';

export const VendorCreateSchema = z.object({
	vendor_id: z.string().nonempty('Vendor ID is required.'),
	name: z.string().nonempty('Name is required.'),
	email: z.string().email('Please enter a valid email address.'),
	phone: z.coerce.string().nonempty('Phone number is required.'),
	bank: z.object({
		account_number: z.coerce.string().nonempty('Account number is required.'),
		account_holder: z.string().nonempty('Account holder name is required.'),
		ifsc: z
			.string()
			.regex(
				/^[A-Z]{4}0[A-Z0-9]{6}$/,
				'Please enter a valid IFSC code (e.g., ABCD0123456).',
			),
	}),
	kyc_details: z.object({
		pan: z
			.string()
			.regex(
				/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
				'Please enter a valid PAN card number (e.g., ABCDE1234F).',
			),
	}),
}) satisfies ZodType<VendorRequest>;
