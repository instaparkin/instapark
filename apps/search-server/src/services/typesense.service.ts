import { typesenseClient } from "../typesense/typesense-client";
import { SEARCH_SERVER_CONSTANTS } from "../constants/search-server-constants";
import { CollectionType } from "@instapark/types";

export class TypesenseService<T> {
    private collection: CollectionType;
    private document: T;

    constructor(collection: CollectionType, document: T) {
        this.collection = collection;
        this.document = document;
    }
    
    private getSchemaName(): string {
        switch (this.collection) {
            case "listing":
                console.log(this.collection);
                
                return SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME;
            case "booking":
                return SEARCH_SERVER_CONSTANTS.SCHEMAS.BOOKING_SCHEMA_NAME;
            default:
                throw new Error(`Unknown collection: ${this.collection}`);
        }
    }

    async createDocument() {
        if (!this.document) {
            throw new Error("Document data is required for creating a document.");
        }

        try {
            const schemaName = this.getSchemaName();
            console.log(schemaName);
            
            return await typesenseClient
                .collections(schemaName)
                .documents()
                .create(this.document);
        } catch (error) {
            throw error;
        }
    }

    async updateDocument(id: string) {
        if (!id || !this.document) {
            throw new Error("Document ID and data are required for updating a document.");
        }

        try {
            const schemaName = this.getSchemaName();
            return await typesenseClient
                .collections(schemaName)
                .documents(id)
                .update(this.document);
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    async deleteDocument(id: string) {
        if (!id) {
            throw new Error("Document ID is required for deleting a document.");
        }

        try {
            const schemaName = this.getSchemaName();
            return await typesenseClient
                .collections(schemaName)
                .documents(id)
                .delete();
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
}
