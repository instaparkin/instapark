import { typesenseClient } from "./typesense-client";

interface AddDocumentsProps<T> {
  collection: string;
  data: T[];
}

export const addDocumentToTypesense = async <T extends Record<string, unknown>>({
  collection,
  data,
}: AddDocumentsProps<T>): Promise<void> => {
  try {
    await typesenseClient
      .collections(collection)
      .documents()
      .import(data, { action: "upsert" });
  } catch (error) {
    console.error(`Error adding documents to collection ${collection}:`, error);
    throw new Error(`Failed to add documents to Typesense collection ${collection}`);
  }
};
