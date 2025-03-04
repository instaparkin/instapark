import z from 'zod';

export const ContactUsSchema = z.object({
	firstname: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	lastname: z.string().min(2, {
		message: 'Surname must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	message: z.string().min(10, {
		message: 'Message must be at least 10 characters.',
	}),
});

export type ContactUsFormType = z.infer<typeof ContactUsSchema>;
