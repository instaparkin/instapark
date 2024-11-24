import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const listingsSchema: CollectionCreateSchema = {
    name: "listings2",
    fields: [
        { name: "listingId", type: "string" },
        { name: "isOpen", type: "bool" },
        { name: "createdAt", type: "int64" },
        { name: "updatedAt", type: "int64" },
    ],
    default_sorting_field: "createdAt",
};