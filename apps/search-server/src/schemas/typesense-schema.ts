import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { SEARCH_SERVER_CONSTANTS } from "../constants/search-server-constants";

export const ListingSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME,
    fields: [
        { name: "userId", type: "string" },
        { name: "type", type: "string", facet: true },
        { name: "country", type: "string", facet: true, sort: true },
        { name: "state", type: "string", facet: true, sort: true },
        { name: "district", type: "string", facet: true, sort: true },
        { name: "city", type: "string", facet: true, sort: true },
        { name: "street", type: "string" },
        { name: "pincode", type: "int64" },
        { name: "latitude", type: "float" },
        { name: "longitude", type: "float" },
        { name: "name", type: "string", optional: true },
        { name: "landmark", type: "string", optional: true },
        { name: "allowedVehicles", type: "string[]", facet: true },
        { name: "basePrice", type: "float", facet: true },
        { name: "pphbi", type: "float", facet: true },
        { name: "pphcy", type: "float", facet: true },
        { name: "pphcr", type: "float", facet: true },
        { name: "plph", type: "float", facet: true },
        { name: "photos", type: "string[]", },

        { name: "id", type: "string" },
        { name: "isOpen", type: "bool", facet: true },
        { name: "rating", type: "float", facet: true },
        { name: "createdAt", type: "int64", "sort": true },
        { name: "updatedAt", type: "int64", "sort": true },

        /**Typesense Related Fields */
        { name: "popularity", type: "int32", optional: true }
    ]
}

export const ReviewSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.REVIEW_SCHEMA_NAME,
    fields: [
        { name: "id", type: "string" },
        { name: "listingId", type: "string", "reference": `${SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME}.id` },
        { name: "userId", type: "string" },
        { name: "location", type: "int32" },
        { name: "rating", type: "int32" },
        { name: "cleanliness", type: "int32" },
        { name: "communication", type: "int32" },
        { name: "value", type: "int32" },
        { name: "accuracy", type: "int32" },
        { name: "description", type: "string" },
        { name: "createdAt", type: "int64", "sort": true },
        { name: "updatedAt", type: "int64", "sort": true },
    ]
}

export const BookingSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.BOOKING_SCHEMA_NAME,
    fields: [
        { name: "id", type: "string" },
        { name: "listingId", type: "string", "reference": `${SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME}.id` },
        { name: "userId", type: "string" },
        { name: "startDate", type: "int64", sort: true },
        { name: "endDate", type: "int64", sort: true },
        { name: "status", type: "string", facet: true, sort: true },
        { name: "createdAt", type: "int64", "sort": true },
        { name: "updatedAt", type: "int64", "sort": true },
    ]
}

/**
 * Query Suggestion/Analytics Schemas
 * https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/query-suggestions/js/.
 */
export const QuerySuggestionSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.QUERY_SUGGESTION_SCHEMA_NAME,
    fields: [
        { name: "id", type: "string" },
        { name: "count", type: "int32" },
        { name: "q", type: "string" },
    ]
}

export const ListingNoHitsQueries: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_NO_HITS_QUERIES,
    fields: [
        { name: "count", type: "int32" },
        { name: "q", type: "string" },
    ]
}
