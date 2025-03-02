import { addUUID, Request, Response, sendResponse } from "@instapark/utils";
import { ListingModel } from "../models/listing.model";
import { Booking, Listing, ListingRequest } from "@instapark/types";
import { listingsCreateSchema } from "@instapark/schemas"

export const createListing = async (req: Request, res: Response) => {
    const session = await ListingModel.startSession();
    try {
        const listing = req.body as ListingRequest;
        console.log(listing);
        
        const result = listingsCreateSchema.safeParse(listing);

        if (!result.success) {
            return sendResponse(res, 400, "Some fields are missing", "FAILURE", result.error);
        }

        session.startTransaction();
        const a = await ListingModel.
            findOne({ latitude: listing.latitude, longitude: listing.longitude })
            .select('-_id -__v');
        if (a) {
            return sendResponse(res, 200, "A Listing already exists on this location", "FAILURE", a);
        }
        const newListing = await ListingModel.create([addUUID(result.data)], { session });
        if (!newListing || !newListing[0]) {
            return sendResponse(res, 400, "Failed to create Listing", "FAILURE");
        }
        const data = newListing[0];
        await session.commitTransaction()
            .then(async () => {
                return sendResponse(res, 201, "Listing created successfully.", "SUCCESS", data);
            });
    } catch (error) {
        await session.abortTransaction();
        return sendResponse(res, 500, `An unexpected error occurred while creating the listing: ${error} `, "FAILURE", error);
    } finally {
        session.endSession();
    }
};

export const updateListing = async (req: Request, res: Response) => {
    try {
        const body = req.body as Listing;
        console.log(body);

        const updatedListing = await ListingModel.findOneAndUpdate(
            { id: body.id },
            body,
            { new: true });

        if (!updatedListing) {
            res.status(404).json({ error: "Listing not found." });
            return;
        }

        sendResponse(res, 200, "Listing updated successfully.", "SUCCESS", updatedListing);
    } catch (error) {
        return sendResponse(res, 500, "An unexpected error occurred while Updating the listing.", "FAILURE", error);
    }
};

export const getListings = async (req: Request, res: Response) => {
    try {
        const { street, bookedListings, vehicleType, userId, id } =
            req.query as unknown as {
                street: string,
                bookedListings: Booking[]
                vehicleType: string
                userId: string
                id: string
            }
        console.log(req.query);

        const listings = await ListingModel.find(
            {
                ...(id ? { id } : {}),
                ...(street ? { $text: { $search: street } } : {}),
                ...(userId ? { userId } : {}),
                ...(vehicleType ? { allowedVehicles: { $in: [vehicleType] } } : {}),
                ...(bookedListings?.length > 0 ? { id: { $nin: bookedListings.map(b => b.listingId) } } : {})
            },
            { _id: 0, __v: 0 }
        );
        return sendResponse(res, 200, "Listings Fetched Successfully", "SUCCESS", listings);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error " + error, "FAILURE", error);
    }
}
