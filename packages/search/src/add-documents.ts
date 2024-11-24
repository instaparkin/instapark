import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { typesenseClient } from "./typesense-client";

interface AddDocumentsProps {
    collection : string;
    data : CollectionCreateSchema[]
}

export const addDocuments = async ({collection, data}: AddDocumentsProps) => {
    try {
        const response = await typesenseClient.collections(collection).documents().import(data, { action: "upsert" });
        console.log("Data added successfully:", response);
    } catch (error) {
        console.log(error);
    }
};
