import { typesenseClient } from "./typesense-client";

interface SearchDocumentsProps {
    collection: string
    query: string
}

export async function searchDocuments({ collection, query }: SearchDocumentsProps) {
    try {
        const response = await typesenseClient.collections(collection).documents().search({
            q: query,
            query_by: "location_state",
            filter_by: "place_type:House",
            sort_by: "createdAt:desc",
        });
        return response;
    } catch (error) {
        console.error("Search Error:", error);
    }
}