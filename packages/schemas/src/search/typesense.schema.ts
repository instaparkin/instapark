import { CollectionType } from "@instapark/types";
import { z } from "zod";

export const typesenseControllerSchema = z.object({
    collection: z.custom<CollectionType>(),
    id: z.string()
})