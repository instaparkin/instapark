import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { typesenseClient } from "./typesense-client";

// Define the sample data (replace this with your actual data or import from a separate file)
const sampleData = [
  {
    listingId: "LST123",
    isOpen: true,
    allowedVehicles: ["car", "bike"],
    createdAt: 1698796800,
    updatedAt: 1701388800,
  },
  {
    listingId: "LST124",
    isOpen: false,
    allowedVehicles: ["car"],
    createdAt: 1698896800,
    updatedAt: 1701389800,
  },
];

// Define the function to add documents to Typesense
interface AddDocumentsProps {
  collection: string;
  data: any[];
}

export const addDocuments = async ({ collection, data }: AddDocumentsProps) => {
  try {
    const response = await typesenseClient
      .collections(collection)
      .documents()
      .import(data, { action: "upsert" });
    console.log("Data added successfully:", response);
  } catch (error) {
    console.error("Error adding documents:", error);
  }
};

// Example usage
(async () => {
  const collectionName = "listings_1";

  // Ensure the collection exists (optional check)
  const collections = await typesenseClient.collections().retrieve();
  const collectionExists = collections.some((col: { name: string }) => col.name === collectionName);

  if (!collectionExists) {
    console.log(`Collection "${collectionName}" does not exist.`);
    return;
  }

  // Add documents to the collection
  await addDocuments({ collection: collectionName, data: sampleData });

  // Optional: Retrieve and display the collections
  const response = await typesenseClient.collections().retrieve();
  console.log("Available collections:", response);
})();
