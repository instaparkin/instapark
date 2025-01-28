import { Booking, BookingRequest } from "@instapark/types";
import { BookingModel } from "../models/booking.model";
import { uuid } from "@instapark/utils";

export class BookingRepository {
    /**
     * Find a booking by query
     */
    static async findExistingBooking(listingId: string, startDate: number, endDate: number): Promise<Booking | null> {
        return await BookingModel.findOne({
            listingId: listingId,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        }) as Booking | null;
    }

    /**
     * Create a new booking
     */
    static async createBooking(data: BookingRequest): Promise<Booking> {
        const session = await BookingModel.startSession();
        session.startTransaction();
        return await BookingModel.create(
            [{
                ...data,
                id: uuid(),
                status: "Locked",
                lockedAt: new Date()
            }],
            { session }
        );
    }

    /**
     * Update a booking by ID
     */
    static async updateById(id: string, data: Partial<Booking>): Promise<Booking | null> {
        return BookingModel.findOneAndUpdate({ id }, data, { new: true }).exec() as Promise<Booking | null>;
    }

    /**
     * Find bookings by criteria
     */
    static async find(query: any): Promise<Booking[]> {
        return BookingModel.find(query).exec() as Promise<Booking[]>;
    }

    /**
     * Delete a booking by ID
     */
    static async deleteById(id: string): Promise<boolean> {
        const result = await BookingModel.deleteOne({ id }).exec();
        return result.deletedCount === 1;
    }
}
