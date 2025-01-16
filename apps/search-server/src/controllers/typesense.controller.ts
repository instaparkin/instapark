import { typesenseClient } from "../typesense/typesense-client";
import { Listing } from "@instapark/types";
import { SEARCH_SERVER_CONSTANTS } from "../constants/search-server-constants";
import { Request, Response, sendResponse } from "@instapark/utils";

// Upsert a listing document
export const createListing = async (req: Request, res: Response) => {
    const data  = req.body as Listing;

    console.log(data);
    
    if (!data) {
        sendResponse(res, 400, "Invalid input from the client side", "FAILURE", null);
        return;
    }

    try {
        const result = await typesenseClient
            .collections(SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME)
            .documents()
            .create(data);

        sendResponse(res, 201, "Documents upserted successfully", "SUCCESS", result);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error" , "FAILURE", {
            data,
            error
        });
    }
};

export const updateListing = async (req: Request, res: Response) => {
    const data  = req.body as Listing;

    console.log(data);
    
    if (!data) {
        sendResponse(res, 400, "Invalid input from the client side", "FAILURE", null);
        return;
    }

    try {
        const result = await typesenseClient
            .collections(SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME)
            .documents(data.id)
            .update(data);

        sendResponse(res, 201, "Documents upserted successfully", "SUCCESS", result);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error" , "FAILURE", {
            data,
            error
        });
    }
};

// Delete a listing document by ID
export const deleteListing = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        sendResponse(res, 400, "Invalid input from the client side", "FAILURE", null);
        return;
    }

    try {
        const result = await typesenseClient
            .collections(SEARCH_SERVER_CONSTANTS.SCHEMAS.LISTING_SCHEMA_NAME)
            .documents(id)
            .delete();

        sendResponse(res, 200, "Documents deleted successfully", "SUCCESS", result);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error" + error, "FAILURE", null);
    }
};
