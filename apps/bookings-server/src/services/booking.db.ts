import { Booking, BookingRequest } from "@instapark/types";
import { BookingModel } from "../models/booking.model";
import { uuid } from "@instapark/utils";

export class BookingDB {
    /**
     * Find a booking by query
     */
    static async findExistingBooking(listingId: string, startDate: number, endDate: number): Promise<Booking | null> {
        return await BookingModel.findOne({
            listingId: listingId,
            $or: [
                { startDate, endDate }
            ]
        }) as Booking;
    }
    /**
     * Update a booking by ID
     */
    static async updateById(id: string, data: Partial<Booking>): Promise<Booking | null> {
        return BookingModel.findOneAndUpdate({ id }, data, { new: true }).exec() as Promise<Booking | null>;
    }

    /**
     * Delete a booking by ID
     */
    static async deleteById(id: string): Promise<boolean> {
        const result = await BookingModel.deleteOne({ id }).exec();
        return result.deletedCount === 1;
    }

    static async findBookings(startDate: number, endDate: number) {
        return await BookingModel.find({ startDate, endDate }, { listingId: 1, _id: 0 });
    }

    static async findBookingsByListingId(listingId: string) {
        return await BookingModel.find({ listingId }, { _id: 0 })
    }

    static async findBookingsByListingIds(listingIds: string[]) {
        return await BookingModel.find({ listingId: { $in: listingIds } }, { _id: 0, __v: 0 })
    }
}
