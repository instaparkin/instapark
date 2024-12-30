import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { typesenseClient } from "../typesense/typesense-client";

interface CreateCollectionProps {
    name: string;
    schema: CollectionCreateSchema;
}

export const createCollection = async ({ name, schema }: CreateCollectionProps) => {
    try {
        console.log(`Creating collection-${name}`);
        const collectionExists = await typesenseClient.collections(name).exists();
        if (collectionExists) {
            console.log(`Collection-${name} already exists`);
            return;
        }
        await typesenseClient.collections().create(schema);
        console.log(`Collection-${name} created`);
    } catch (error) {
        console.log(error);
    }
};

typesenseClient.collections().retrieve().then((response) => console.log(response));