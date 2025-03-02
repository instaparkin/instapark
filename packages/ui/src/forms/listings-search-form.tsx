import { zodResolver } from '@hookform/resolvers/zod';
import { listingsSearchSchema, z } from '@instapark/schemas';
import { Vehicle } from '@instapark/types';
import { useForm } from 'react-hook-form';

export type ListingsSearchFormType = z.infer<typeof listingsSearchSchema>;

export const listingsSearchForm = () =>
	useForm<ListingsSearchFormType>({
		resolver: zodResolver(listingsSearchSchema),
		defaultValues: {
			street: '',
			vehicleType: Vehicle.Bike,
			startDate: new Date().toISOString().slice(0, 16),
			endDate: new Date(new Date().getTime() + 5 * 60 * 60 * 1000)
				.toISOString()
				.slice(0, 16),
		},
	});
