import { Request, Response } from "@instapark/utils";
import { Booking, CollectionType, Listing } from "@instapark/types";
import { sendResponse } from "@instapark/utils";
import { TypesenseService } from "../services/typesense.service";

export const createDocument = async (req: Request, res: Response) => {
    const data = req.body as Listing | Booking;
    const { collection } = req.params as { collection: CollectionType }

    console.log(collection);
    

    if (!data) {
        sendResponse(res, 400, "Invalid input from the client side", "FAILURE", null);
        return;
    }

    try {
        switch (collection) {
            case "listing": {
                const typesenseService = new TypesenseService<Listing>(collection, data as Listing);
                const result = await typesenseService.createDocument();
                return sendResponse(res, 201, "Document created successfully", "SUCCESS", result);
            }
            case "booking": {
                const typesenseService = new TypesenseService<Booking>(collection, data as Booking);
                const result = await typesenseService.createDocument();
                return sendResponse(res, 201, "Document created successfully", "SUCCESS", result);
            }
        }
    } catch (error) {
        return sendResponse(res, 500, "Failed to create document", "FAILURE", { error });
    }
};

export const updateDocument = async (req: Request, res: Response) => {
    const data = req.body as Listing | Booking;
    const { collection } = req.params as { collection: CollectionType }

    if (!data || !data.id) {
        return sendResponse(res, 400, "Invalid input from the client side", "FAILURE", null);
    }

    try {
        switch (collection) {
            case "listing": {
                const typesenseService = new TypesenseService<Listing>(collection, data as Listing);
                const result = await typesenseService.updateDocument(data.id);
                return sendResponse(res, 200, "Document updated successfully", "SUCCESS", result);
            }
            case "booking": {
                const typesenseService = new TypesenseService<Booking>(collection, data as Booking);
                const result = await typesenseService.updateDocument(data.id);
                return sendResponse(res, 200, "Document updated successfully", "SUCCESS", result);
            }
        }

    } catch (error) {
        return sendResponse(res, 500, "Failed to update document", "FAILURE", { error });
    }
};

export const deleteDocument = async (req: Request, res: Response) => {
    const { collection, id } = req.params as { collection: CollectionType, id: string };

    if (!id) {
        return sendResponse(res, 400, "Invalid input from the client side", "FAILURE", null);
    }

    try {
        const typesenseService = new TypesenseService<null>(collection, null);
        const result = await typesenseService.deleteDocument(id);
        return sendResponse(res, 200, "Document deleted successfully", "SUCCESS", result);
    } catch (error) {
        return sendResponse(res, 500, "Failed to delete document", "FAILURE", { error });
    }
};
