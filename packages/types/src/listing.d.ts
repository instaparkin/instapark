/**
 * These types are used in both the frontend and backend of the project.
 * These are defined directly from the database.
 * These should be changed accordingly whenever the database is changed.
 */

export type PlaceType = 'House' | 'Barn' | 'Cabin' | 'Castle' | 'Hotel' | 'Farm';

export type Vehicle = "Car" | "Bike" | "Cycle"

export interface Photo {
    listingId: string
    url: string
    createdAt: Date;
    updatedAt: Date;
}

export interface AllowedVehicle {
    listingId: string
    vehicle: Vehicle
}

export interface NotAvailableDate {
    listingId: string;
    startDate: Date;
    endDate: Date
}

export interface Listing {
    id: string;
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
    allowedVehicles: AllowedVehicle[];
    basePrice: number;
    pphbi: number;
    pphcy: number;
    pphcr: number;
    plph: number;
    photos: Photo[]
    notAvailableDates?: NotAvailableDate[]
    createdAt: Date;
    updatedAt: Date;
}
