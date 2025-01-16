import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { SEARCH_SERVER_CONSTANTS } from "../constants/search-server-constants";

export const ListingSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME,
    enable_nested_fields: true,
    fields: [
        { name: "id", type: "string" },
        { name: "userId", type: "string" },
        { name: "type", type: "string" },
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
        { name: "allowedVehicles", type: "object[]", facet: true },
        { name: "basePrice", type: "float" },
        { name: "pphbi", type: "float" },
        { name: "pphcy", type: "float" },
        { name: "pphcr", type: "float" },
        { name: "plph", type: "float" },
        { name: "photos", type: "object[]" },
        { name: "availableDates", type: "object[]", facet: true, optional: true },
        { name: "isOpen", type: "bool" },
        { name: "createdAt", type: "string", "sort": true },
        { name: "updatedAt", type: "string", "sort": true },
    ]
}

export const ReviewSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.REVIEW_SCHEMA_NAME,
    fields: [
        { name: "id", type: "string" },
        { name: "listingId", type: "string", "reference": `${SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME}.listingId` },
        { name: "location", type: "int32" },
        { name: "cleanliness", type: "int32" },
        { name: "communication", type: "int32" },
        { name: "value", type: "int32" },
        { name: "accuracy", type: "int32" },
        { name: "description", type: "string" },
        { name: "createdAt", type: "string", "sort": true },
        { name: "updatedAt", type: "string", "sort": true },
    ]
}

export const RatingSchema: CollectionCreateSchema = {
    name: SEARCH_SERVER_CONSTANTS.SCHEMAS.RATING_SCHEMA_NAME,
    fields: [
        { name: "id", type: "string" },
        { name: "listingId", type: "string", "reference": `${SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME}.listingId` },
        { name: "rating", type: "int32" },
        { name: "createdAt", type: "string", "sort": true },
        { name: "updatedAt", type: "string", "sort": true },
    ]
}

