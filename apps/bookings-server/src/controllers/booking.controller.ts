import { getInterval, Request, Response, sendResponse } from "@instapark/utils";
import { BookingModel } from "../models/booking.model";
import { Booking } from "@instapark/types";
import { v4 as uuid } from "uuid";

const FIVE_MINUTES_IN_SECONDS = 5 * 60 * 1000

/**
 * Check if a booking exists with lockedAt > 5min or not created.
 * @param req 
 * @param res 
 */
export const createLock = async (req: Request, res: Response) => {
    try {
        const booking = req.body as Booking;

        if (!booking || !booking.listingId || !booking.startDate || !booking.endDate) {
            return sendResponse(res, 400, "Missing required fields", "FAILURE");
        }

        const existingBooking = await BookingModel.findOne({
            listingId: booking.listingId,
            $or: [
                { startDate: { $gte: booking.startDate }, endDate: { $gt: booking.startDate } },
                { startDate: { $lt: booking.endDate }, endDate: { $gte: booking.endDate } },
                { startDate: { $gte: booking.startDate }, endDate: { $lte: booking.endDate } }
            ]
        }) as Booking;

        if (!existingBooking) {
            const createdBooking = await BookingModel.create({
                ...booking,
                id: uuid(),
                status: "Locked",
                lockedAt: new Date(Date.now())
            });

            return sendResponse(
                res,
                201,
                "Booking created successfully",
                "SUCCESS",
                createdBooking
            );
        }

        const lockedInterval = getInterval(new Date(existingBooking.lockedAt), new Date(Date.now()));

        if (existingBooking.status === "Completed") {
            return sendResponse(
                res,
                200,
                "Parking Trip already Completed",
                "SUCCESS",
            );
        }

        if (existingBooking.lockedAt && lockedInterval > FIVE_MINUTES_IN_SECONDS) {
            const updatedBooking = await BookingModel.updateOne(
                { id: existingBooking.id },
                {
                    ...booking,
                    lockedAt: new Date(Date.now())
                },
                { new: true }
            );

            return sendResponse(
                res,
                200,
                "Booking updated successfully",
                "SUCCESS",
                updatedBooking
            );
        }

        return sendResponse(
            res,
            200,
            "Listing is not Available For Booking",
            "SUCCESS"
        );
    } catch (error) {
        return sendResponse(
            res,
            500,
            "Failed to process booking",
            "FAILURE",
            error instanceof Error ? error.message : error
        );
    }
};