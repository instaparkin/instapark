import { BookingRequest } from "./Booking";
import { Vehicle, PlaceType } from "./enums";

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
    pphbi: number;
    pphcy: number;
    pphcr: number;
    plph: number;
    photos: string[];

    /**Fields Not required During form submission */
    id: string;
    isOpen: boolean;
    rating: number;
    createdAt: number;
    updatedAt: number;
}

export interface Review {
    id: string
    listingId: string;
    userId: string;
    rating: number;
    location: number;
    cleanliness: number;
    communication: number;
    value: number;
    accuracy: number;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type ReviewRequest = Omit<Review, "createdAt" | "updatedAt">

export type ListingRequest = Omit<Listing, "id" | "createdAt" | "updatedAt" | "isOpen" | "availableFrom" | "rating">

export type ListingSearch =  {
    q: string
    vehicleType: typeof Vehicle;
    page: number
    startDate?: number;
    endDate?: number;
}