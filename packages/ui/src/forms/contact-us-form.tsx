import { zodResolver } from '@hookform/resolvers/zod';
import { ContactUsFormType, ContactUsSchema } from '@instapark/schemas';
import { useForm } from 'react-hook-form';

export const ContactUsForm = () => {
	const form = useForm<ContactUsFormType>({
		resolver: zodResolver(ContactUsSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			message: '',
		},
	});

	return {
		form,
	};
};
