export enum PlaceType { "House", "Barn", "Cabin", "Castle", "Hotel", "Farm" }

export enum Vehicle {
    "Car",
    "Cycle",
    "Bike"
}

export interface Listing {
    listingId: string;
    userId: string;
    isOpen: boolean;
    createdAt: number;
    updatedAt: number;
    type: string;
    country: string;
    state: string;
    district: string;
    city: string;
    street: string;
    pincode: number;
    latitude: number;
    longitude: number;
    name: string;
    landmark: string;
    allowedVehicles: Vehicle[];
    basePrice: number;
    pphbi: number;
    pphcy: number;
    pphcr: number;
    plph: number;
    photos: string[]
}

export interface SearchResult<T> {
    facet_counts: unknown[];
    found: number;
    hits: Array<{
        document: T;
        highlight: Record<string, unknown>;
        highlights: unknown[];
    }>;
    out_of: number;
    page: number;
    request_params: {
        collection_name: string;
        first_q: string;
        per_page: number;
        q: string;
    };
    search_cutoff: boolean;
    search_time_ms: number;
}

export interface ApiResponse {
    results: [
        SearchResult<Listing>,
    ];
}
export interface Query {
    listing: string
    queryBy: string[]
}

export interface UseSearchProps {
    query_by: string[]
    collections: {
        name: string
        q: string
        filter_by?: string
    }[]
}
