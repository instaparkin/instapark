import { addUUID, toUnixTimestamp, Request, Response, sendResponse, axios } from "@instapark/utils";
import { ListingModel } from "../models/listing.model";
import { ApiResponse, Booking, Listing, ListingRequest, ListingSearch, Vehicle } from "@instapark/types";
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
        const data = newListing[0];

        await session.commitTransaction()
            .then(async () => {
                /**Produce the message to kafka to add it to Typesense */
                const ack = await searchProducer({
                    type: "POST",
                    data: data,
                    partition: 0
                });
                if (ack[0]?.errorCode === 0) {
                    return sendResponse(res, 201, "Listing created successfully.", "SUCCESS", { data, ack });
                }
            });
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

        sendResponse(res, 200, "Listing fetched successfully.", "SUCCESS", listing[0]);
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

export const getAllListings = async (req: Request, res: Response) => {
    try {
        const filters: Partial<Record<string, any>> = {};
        const { street, startDate, endDate, vehicleType, userId } = req.query as Record<string, string>;

        if (street) filters.$text = { $search: street };

        if (userId) {
            filters.userId = { $eq: userId }
        }

        if (vehicleType) filters.allowedVehicles = { $in: [vehicleType] };

        const bookingsPromise = startDate && endDate
            ? axios.get<ApiResponse<{ listingId: string }[]>>(
                `http://localhost:8085/bookings/all?startDate=${startDate}&endDate=${endDate}`
            ).then(res => res.data.data)
            : Promise.resolve([]);

        const [bookings] = await Promise.all([bookingsPromise]);

        if (bookings?.length > 0) filters.id = { $nin: bookings.map(l => l.listingId) };

        const listings = await ListingModel.find(filters, { _id: 0, __v: 0 });

        return sendResponse(res, 200, "Listings Fetched Successfully", "SUCCESS", listings);
    } catch (error) {
        return sendResponse(res, 500, "An unexpected error occurred while fetching the results.", "FAILURE", error);
    }
}    