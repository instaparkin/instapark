/** 
 * In order to create a collection first change the schema accordinly and then change the name and run this script
 */

import { SEARCH_SERVER_CONSTANTS } from "@instapark/constants";
import { createCollection } from "../actions/create-collection";
import { ListingSchema, RatingSchema, ReviewSchema } from "../schemas/typesense-schema";
import { typesenseClient } from "../typesense/typesense-client";

interface IcreateCollectionScript {
    deleteAllCollections: boolean,
    collectionsToDelete?: string[]
}

const collections = [
    {
        name: SEARCH_SERVER_CONSTANTS.schemas.LISTING_SCHEMA_NAME,
        schema: ListingSchema
    },
    {
        name: SEARCH_SERVER_CONSTANTS.schemas.REVIEW_SCHEMA_NAME,
        schema: ReviewSchema
    },
    {
        name: SEARCH_SERVER_CONSTANTS.schemas.RATING_SCHEMA_NAME,
        schema: RatingSchema
    },
]

async function createCollectionScript({ deleteAllCollections, collectionsToDelete }: IcreateCollectionScript) {

    collections.map(async (collection) => {
        /**
         * Use this only when you want to delete all the collections and recreate them all
         */
        if (deleteAllCollections) {
            await typesenseClient.collections(collection.name).delete()
        }

        if (collectionsToDelete) {
            collectionsToDelete.map(async (ctd) => {
                if (ctd === collection.name) {
                    await typesenseClient.collections(collection.name).delete()
                }
            })
        }
        await createCollection(collection);
    }
    )
}

createCollectionScript({
    deleteAllCollections: true
});