import { typesenseClient } from "./typesense-client";

interface AddDocumentsProps<T> {
  collection: string;
  data: T | T[];
}

export const addDocumentToTypesense = async <T extends Record<string, unknown>>({
  collection,
  data,
}: AddDocumentsProps<T>): Promise<void> => {
  try {
    // Ensure data is an array
    const documents = Array.isArray(data) ? data : [data];

    await typesenseClient
      .collections(collection)
      .documents()
      .import(documents, { action: "upsert" });
  } catch (error) {
    console.error(`Error adding documents to collection ${collection}:`, error);
    throw new Error(`Failed to add documents to Typesense collection ${collection}`);
  }
};
