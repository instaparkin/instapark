import { z } from 'zod';
import { ListingRequest, PlaceType, Vehicle } from '@instapark/types';

export const listingsCreateSchema: z.ZodType<ListingRequest> = z
	.object({
		userId: z.string(),
		type: z.nativeEnum(PlaceType),
		country: z.string({ message: 'Country is required' }),
		state: z.string({ message: 'State is required' }),
		district: z.string({ message: 'District is required' }),
		city: z.string({ message: 'City is required' }),
		street: z.string({ message: 'Street is required' }),
		pincode: z.coerce.number({ message: 'Pincode is required' }).int(),
		latitude: z.coerce.number(),
		longitude: z.coerce.number(),
		name: z.string().optional(),
		landmark: z.string().optional(),
		allowedVehicles: z.array(z.nativeEnum(Vehicle)).max(3),
		basePrice: z.coerce.number().min(10.0),
		pphbi: z.coerce.number().min(10.0).optional(),
		pphcy: z.coerce.number().min(5.0).optional(),
		pphcr: z.coerce.number().min(20.0).optional(),
		plph: z.coerce.number().min(60.0),
		photos: z.array(z.string()).min(4).max(8),
	})
	.superRefine((data, ctx) => {
		const pricingFields: Record<Vehicle, keyof ListingRequest> = {
			Bike: 'pphbi',
			Cycle: 'pphcy',
			Car: 'pphcr',
		};
		data.allowedVehicles.forEach((vehicle) => {
			const priceField = pricingFields[vehicle];
			if (priceField && data[priceField] === undefined) {
				ctx.addIssue({
					path: [priceField],
					code: z.ZodIssueCode.custom,
					message: `Pricing per hour for ${vehicle.toLowerCase()} is required.`,
				});
			}
		});
	});
