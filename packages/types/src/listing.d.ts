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

export interface AvailableDate {
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
    availableDates?: AvailableDate[];
    isOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string
    listingId: string;
    location: number;
    cleanliness: number;
    communication: number;
    value: number;
    accuracy: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Rating {
    id: string;
    listingId: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export type PhotoRequest =
    Omit<Photo,
        "listingId" | "createdAt" | "updatedAt">;

export type AllowedVehicleRequest = Omit<AllowedVehicle, "listingId">;

export type AvailableDateRequest = Omit<AvailableDate, "listingId">;

export type ListingRequest =
    Omit<Listing,
        "id" | "createdAt" | "updatedAt" | "allowedVehicles" | "photos" | "availableDates" | "isOpen"> &
    {
        photos: PhotoRequest[];
        allowedVehicles: AllowedVehicleRequest[];
    };