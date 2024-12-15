/** 
 * In order to create a collection first change the schema accordinly and then change the name and run this script
 */

import { createCollection } from "../typesense/create-collection";
import { ListingSchema, LocationSchema, NotAvailableDatesSchema, PlaceSchema, PricingSchema, RatingSchema, ReviewSchema } from "../typesense/typesense-schema";
import config from "../typesense/config.json";

const collections = [
    {
        name: config.schemas.LISTING_SCHEMA_NAME,
        schema: ListingSchema
    },
    {
        name: config.schemas.PLACE_SCHEMA_NAME,
        schema: PlaceSchema
    },
    {
        name: config.schemas.PRICING_SCHEMA_NAME,
        schema: PricingSchema
    },
    {
        name: config.schemas.NOT_AVAILABLE_DATES_SCHEMA_NAME,
        schema: NotAvailableDatesSchema
    },
    {
        name: config.schemas.REVIEW_SCHEMA_NAME,
        schema: ReviewSchema
    },
    {
        name: config.schemas.RATING_SCHEMA_NAME,
        schema: RatingSchema
    },
    {
        name: config.schemas.LOCATION_SCHEMA_NAME,
        schema: LocationSchema
    }
]

async function createCollectionScript() {
    collections.map((collection) => createCollection(collection));
}

createCollectionScript();