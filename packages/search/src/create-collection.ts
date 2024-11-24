import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { typesenseClient } from "./typesense-client";

interface CreateCollectionProps {
    namespace: string;
    version: number;
    schema: CollectionCreateSchema;
}

export const createCollection = async ({ namespace, version, schema }: CreateCollectionProps) => {
    try {
        const collectionExists = await typesenseClient.collections(`${namespace}_${version}`).exists();
        if (collectionExists) {
            console.log("Collection already exists");
            return;
        }
        await typesenseClient.collections().create(schema);
        console.log("Collection created");
    } catch (error) {
        console.log(error);
    }
};
