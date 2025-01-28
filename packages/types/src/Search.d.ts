import { Listing } from "./Listing";

export interface Hit<T> {
    document: T;
    highlight: Record<string, unknown>;
    highlights: unknown[];
}

export interface SearchResult<T> {
    facet_counts: unknown[];
    found: number;
    hits: Array<Hit<T>>;
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

export interface TypesenseResponse {
    results: [
        SearchResult<Listing>,
    ];
}
export interface Query {
    listing: string
    queryBy: string[]
}

export interface UseSearchProps {
    q: string
    query_by: string[]
    filter_by?: string
}

export interface OlaMapsPrediction extends Record<string, unknown> {
    description: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

export interface OlaMapsApiResponse {
    predictions: OlaMapsPrediction[];
}

export interface OlaMapsGeocodingResult {
    formatted_address: string
}

export type CollectionType = "listing" | "booking"
