import { addUUID, Request, Response, sendResponse } from "@instapark/utils";
import { ListingModel, AllowedVehicleModel, PhotoModel } from "../models/listing.models";
import { ListingRequest } from "@instapark/types";
import { listingsCreateSchema } from "@instapark/schemas"
import { searchProducer } from "@instapark/kafka";

export const createListing = async (req: Request, res: Response) => {
    const session = await ListingModel.startSession();

    try {
        const listing = req.body as ListingRequest;
        const result = listingsCreateSchema.safeParse(listing);

        if (!result.success) {
            return sendResponse(res, 400, "Some fields are missing", "FAILURE", result.error);
        }

        session.startTransaction();
        const a = await ListingModel.findOne({ latitude: listing.latitude, longitude: listing.longitude }).select('-_id -__v');
        if (a) {
            return sendResponse(res, 200, "A Listing already exists on this location", "FAILURE", a);
        }
        const newListing = await ListingModel.create([addUUID(listing)], { session });
        if (!newListing || !newListing[0]) {
            return sendResponse(res, 400, "Failed to create Listing", "FAILURE");
        }
        const allowedVehicles = await AllowedVehicleModel.create(
            listing.allowedVehicles.map(vehicle =>
                addUUID(vehicle, newListing[0]?.id, "listingId")
            ), { session });

        const photos = await PhotoModel.create(listing.photos.map(photo =>
            addUUID(photo, newListing[0]?.id, "listingId")
        ), { session });

            console.log(newListing[0]);
        await session.commitTransaction();
        const data = {
            ...newListing[0]._doc, // Spread all fields of newListing[0]
            allowedVehicles,
            photos
        };

        console.log(data);
        
        /**Produce the message to kafka to add it to Typesense */
        await searchProducer({
            type: "POST",
            data: data,
            partition: 0
        });
        return sendResponse(res, 201, "Listing created successfully.", "SUCCESS", data);
    } catch (error) {
        await session.abortTransaction();
        return sendResponse(res, 500, "An unexpected error occurred while creating the listing.", "FAILURE", error);
    } finally {
        session.endSession();
    }
};

export const getListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const listing = await ListingModel.find({ id }).select('-_id -__v');

        if (!listing || listing.length === 0) {
            res.status(404).json({ error: "Listing not found." });
            return;
        }

        sendResponse(res, 200, "Listing fetched successfully.", "SUCCESS", listing);
    } catch (error) {
        return sendResponse(res, 500, "An unexpected error occurred while fetching the listing.", "FAILURE", error);
    }
};

export const updateListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body as ListingRequest;

        const updatedListing = await ListingModel.findOneAndUpdate({ id }, updates, { new: true });

        if (!updatedListing) {
            res.status(404).json({ error: "Listing not found." });
            return;
        }

        await searchProducer({
            type: "PUT",
            data: updatedListing,
            partition: 0
        });
        sendResponse(res, 200, "Listing updated successfully.", "SUCCESS", updatedListing);
    } catch (error) {
        return sendResponse(res, 500, "An unexpected error occurred while Updating the listing.", "FAILURE", error);
    }
};

export const deleteListing = async (req: Request, res: Response) => {
    const session = await ListingModel.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        await AllowedVehicleModel.deleteMany({ listingId: id }, { session });

        await PhotoModel.deleteMany({ listingId: id }, { session });

        const deletedListing = await ListingModel.findOneAndDelete({ id }, { session });

        await searchProducer({
            type: "DELETE",
            data: id as string,
            partition: 0
        });

        if (!deletedListing) {
            throw new Error("Listing not found.");
        }

        await session.commitTransaction();

        sendResponse(res, 200, "Listing deleted successfully.", "SUCCESS", deletedListing);
    } catch (error) {
        await session.abortTransaction();
        return sendResponse(res, 500, "An unexpected error occurred while Deleting the listing.", "FAILURE", error);
    } finally {
        session.endSession();
    }
};
