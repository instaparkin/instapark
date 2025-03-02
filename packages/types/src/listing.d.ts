import { BookingRequest } from './Booking';
import { Vehicle, PlaceType } from './enums';

export interface Listing {
	/**Fields required During form submission */
	userId: string;
	type: PlaceType;
	country: string;
	state: string;
	district: string;
	city: string;
	street: string;
	pincode: number;
	latitude: number;
	longitude: number;
	name?: string;
	landmark?: string;
	allowedVehicles: Vehicle[];
	basePrice: number;
	pphbi?: number;
	pphcy?: number;
	pphcr?: number;
	plph: number;
	photos: string[];

	/**Fields Not required During form submission */
	id: string;
	isOpen: boolean;
	createdAt: number;
	updatedAt: number;
}

export type ListingRequest = Omit<
	Listing,
	'id' | 'createdAt' | 'updatedAt' | 'isOpen'
>;

export type ListingSearch = {
	street?: string;
	startDate?: string;
	endDate?: string;
	vehicleType: Vehicle;
};
