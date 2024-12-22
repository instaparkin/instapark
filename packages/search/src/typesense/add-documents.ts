import { typesenseClient } from "./typesense-client";

interface AddDocumentsProps {
  collection: string;
  data: Record<string, unknown>[];
}

export const addDocumentToTypesense = async ({ collection, data }: AddDocumentsProps) => {
  try {
    await typesenseClient
      .collections(collection)
      .documents()
      .import(data, { action: "upsert" });
  } catch (error) {
    throw error;
  }
};
