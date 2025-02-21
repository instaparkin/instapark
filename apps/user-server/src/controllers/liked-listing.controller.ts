import { LikedListingRequest } from "@instapark/types";
import { sendResponse, uuid } from "@instapark/utils";
import { Request, Response } from "express";
import { LikedListingModel } from "../models/liked-listing.model";

export const createLikedListing = async (req: Request, res: Response) => {
    try {
        const likedListingRequest = req.body as LikedListingRequest;
        const likedListing = await LikedListingModel.create([
            {
                ...likedListingRequest,
                id: uuid()
            }
        ]);
        return sendResponse(res, 201, "Liked Listing added successfully", "SUCCESS", likedListing);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", "FAILURE", error);
    }
};

export const getLikedListings = async (req: Request, res: Response) => {
    try {
        const { listingId, userId, id } = req.query;
        const likedListing = await LikedListingModel.find(
            {
                ...(listingId ? { listingId } : {}),
                ...(userId ? { userId } : {}),
                ...(id ? { id } : {})
            }
        );
        if (!likedListing) {
            return sendResponse(res, 404, "Liked Listing not found", "FAILURE", null);
        }
        return sendResponse(res, 200, "Liked Listing fetched successfully", "SUCCESS", likedListing);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", "FAILURE", error);
    }
};

export const deleteLikedListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const deletedLikedListing = await LikedListingModel.findOneAndDelete({ id });
        if (!deletedLikedListing) {
            return sendResponse(res, 404, "Liked Listing not found", "FAILURE", null);
        }
        return sendResponse(res, 200, "Liked Listing deleted successfully", "SUCCESS", null);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", "FAILURE", error);
    }
};
