import { ApiResponse, Booking, BookingRequest } from "@instapark/types";
import { BookingModel } from "../models/booking.model";
import { getInterval, logger, uuid } from "@instapark/utils";

const LOCK_INTERVAL = 0.5 * 60 * 1000;

export class BookingService {
    private bookingRequest: BookingRequest;
    private existingBooking: Booking | null = null;

    constructor(bookingRequest: BookingRequest) {
        if (!bookingRequest.listingId || !bookingRequest.startDate || !bookingRequest.endDate) {
            throw new Error("Invalid booking request: Missing required fields.");
        }
        this.bookingRequest = bookingRequest;
    }

    private async checkExistingBooking() {
        try {
            this.existingBooking = await BookingModel.findOne({
                listingId: this.bookingRequest.listingId,
                $or: [
                    { startDate: { $lte: this.bookingRequest.endDate }, endDate: { $gte: this.bookingRequest.startDate } }
                ]
            }) as Booking | null;
        } catch (error) {
            throw new Error(`Error checking existing bookings for listingId: ${this.bookingRequest.listingId}. Error: ${error}`);
        }
    }

    private async isListingAvailable(): Promise<boolean> {
        if (!this.existingBooking) return true;
        switch (this.existingBooking.status) {
            case "Locked": {
                const lockedInterval = getInterval(
                    new Date(this.existingBooking.lockedAt),
                    new Date()
                );
                return lockedInterval > LOCK_INTERVAL;
            }
            case "Booked":
            case "Completed":
                return false;
            default:
                return false;
        }
    }

    private async createBooking() {
        const session = await BookingModel.startSession();
        session.startTransaction();
        try {
            const createdBooking = await BookingModel.create(
                [{
                    ...this.bookingRequest,
                    id: uuid(),
                    status: "Locked",
                    lockedAt: new Date()
                }],
                { session }
            );
            await session.commitTransaction();
            return createdBooking;
        } catch (error) {
            await session.abortTransaction();
            return (`Error creating booking: ${error}`);
        } finally {
            session.endSession();
        }
    }

    private async updateBooking() {
        if (!this.existingBooking) return;

        const isAvailable = await this.isListingAvailable();

        if (!isAvailable) {
            logger.info("Listing is not available for update.");
            return null;
        }

        try {
            const updatedBooking = await BookingModel.updateOne(
                { id: this.existingBooking.id },
                {
                    ...this.bookingRequest,
                    lockedAt: new Date()
                }
            );
            return updatedBooking;
        } catch (error) {
            return (`Error updating booking for id: ${this.existingBooking.id}. Error: ${error}`);
        }
    }

    async book() {
        await this.checkExistingBooking();

        if (!this.existingBooking) {
            try {
                const createdBooking = await this.createBooking();
                return { success: true, message: "Booking Created Successfully", booking: createdBooking };
            } catch (error) {
                return { success: false, message: `Error creating booking: ${error}` };
            }
        }

        const isOpen = await this.isListingAvailable();

        if (!isOpen) {
            return { success: false, message: "Listing is not available for Booking." };
        }

        try {
            const updatedBooking = await this.updateBooking();
            if (updatedBooking) {
                return { success: true, message: "Booking updated successfully", booking: updatedBooking };
            } else {
                return { success: false, message: "Listing is not available for update." };
            }
        } catch (error) {
            return { success: false, message: `Error updating booking: ${error}` };
        }
    }

}
