import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import config from "../../search-config.json";

export const ListingSchema: CollectionCreateSchema = {
    name: config.schemas.LISTING_SCHEMA_NAME,
    fields: [
        { name: "listingId", type: "string" },
        { name: "userId", type: "string" },
        { name: "isOpen", type: "bool", facet: true, "sort": true },
        { name: "createdAt", type: "int64", "sort": true },
        { name: "updatedAt", type: "int64", "sort": true },
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
        { name: "basePrice", type: "float" },
        { name: "pphbi", type: "float" },
        { name: "pphcy", type: "float" },
        { name: "pphcr", type: "float" },
        { name: "plph", type: "float" },
        { name: "allowedVehicles", type: "string[]", facet: true },
        { name: "notAvailableDates", type: "int64[]", acet: true, optional: true },
        { name: "photos", type: "string[]" }
    ]
}

export const ReviewSchema: CollectionCreateSchema = {
    name: config.schemas.REVIEW_SCHEMA_NAME,
    fields: [
        { name: "reviewId", type: "string", "reference": `${config.schemas.LISTING_SCHEMA_NAME}.listingId` },
        { name: "listingId", type: "string", "reference": `${config.schemas.LISTING_SCHEMA_NAME}.listingId` },
        { name: "location", type: "int32" },
        { name: "cleanliness", type: "int32" },
        { name: "communication", type: "int32" },
        { name: "value", type: "int32" },
        { name: "accuracy", type: "int32" },
        { name: "description", type: "string" },
        { name: "createdAt", type: "int64", "sort": true },
        { name: "updatedAt", type: "int64", "sort": true },
    ]
}

export const RatingSchema: CollectionCreateSchema = {
    name: config.schemas.RATING_SCHEMA_NAME,
    fields: [
        { name: "ratingId", type: "string", "reference": `${config.schemas.LISTING_SCHEMA_NAME}.listingId` },
        { name: "listingId", type: "string", "reference": `${config.schemas.LISTING_SCHEMA_NAME}.listingId` },
        { name: "rating", type: "int32" },
        { name: "createdAt", type: "int64", "sort": true },
        { name: "updatedAt", type: "int64", "sort": true },
    ]
}

