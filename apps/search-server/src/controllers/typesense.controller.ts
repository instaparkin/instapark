import { Request, Response } from "express";
import { typesenseClient } from "../typesense/typesense-client";

export const addDocumentsToTypesense = async (req: Request, res: Response) => {
    const { collection, data } = req.body;
    try {
        const documents = Array.isArray(data) ? data : [data];
        await typesenseClient
            .collections(collection)
            .documents()
            .import(documents, { action: "upsert" });
    } catch (error) {
        console.error(`Error adding documents to collection ${collection}:`, error);
        throw new Error(`Failed to add documents to Typesense collection ${collection}`);
    }
}