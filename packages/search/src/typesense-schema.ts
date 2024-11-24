import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { typesenseClient } from "./typesense-client";
import { SearchParams } from "typesense/lib/Typesense/Documents";
import { createCollection } from "./create-collection";

const sampleListings = [
    {
        listingId: "1",
        place_name: "Cozy Cottage",
        place_type: "House",
        photo_urls: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
        review_descriptions: ["Lovely place!", "Very comfortable stay."],
        ratings: [4, 5],
        location_country: "USA",
        location_state: "California",
        location_city: "Los Angeles",
        latitude: 34.0522,
        longitude: -118.2437,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    {
        listingId: "2",
        place_name: "Mountain Cabin",
        place_type: "Cabin",
        photo_urls: ["https://example.com/photo3.jpg", "https://example.com/photo4.jpg"],
        review_descriptions: ["Great view!", "Perfect getaway."],
        ratings: [5, 5],
        location_country: "Canada",
        location_state: "British Columbia",
        location_city: "Whistler",
        latitude: 50.1163,
        longitude: -122.9574,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
];

const listingsSchema: CollectionCreateSchema = {
    name: "listings2",
    fields: [
        { name: "listingId", type: "string" },
        { name: "place_name", type: "string", facet: true },
        { name: "place_type", type: "string", facet: true },
        { name: "photo_urls", type: "string[]", optional: true },
        { name: "review_descriptions", type: "string[]", optional: true },
        { name: "ratings", type: "int32[]", optional: true },
        { name: "location_country", type: "string", facet: true, optional: true },
        { name: "location_state", type: "string", facet: true, optional: true },
        { name: "location_city", type: "string", facet: true, optional: true },
        { name: "latitude", type: "float", optional: true },
        { name: "longitude", type: "float", optional: true },
        { name: "createdAt", type: "int64"},
        { name: "updatedAt", type: "int64" },
    ],
    default_sorting_field: "createdAt",
};

// Create collection
createCollection({
    namespace: "listings",
    version: 2,
    schema: listingsSchema,
});


// Add documents to collection
export const addDocumentsToCollection = async () => {
    try {
        const response = await typesenseClient.collections("listings2").documents().import(sampleListings, { action: "upsert" });
        console.log("Data added successfully:", response);
    } catch (error) {
        console.log(error);
    }
};

// Perform search on collection
async function search() {
    try {
        const response = await typesenseClient.collections("listings2").documents().search({
            q: "California",
            query_by: "location_state",
            filter_by: "place_type:House",
            sort_by: "createdAt:desc",
        });
        console.log("Search Results:", response);
    } catch (error) {
        console.error("Search Error:", error);
    }
}

// Run functions
(async () => {
    await createCollection({ namespace: "listings", version: 0, schema: listingsSchema });
    await addDocumentsToCollection();
    await search();
})();


//TODO
//1. Add function to create collection
//2. Add function to add documents to collection
//3. Add function to search collection
//4. Add function to update documents in collection