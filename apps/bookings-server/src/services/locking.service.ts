import { Booking, BookingRequest } from "@instapark/types";
import { BookingModel } from "../models/booking.model";
import { getInterval, logger, toUnixTimestamp, uuid } from "@instapark/utils";

const LOCK_INTERVAL = 0.5 * 60;

export class LockingService {
    private lockingRequest: BookingRequest;
    private existingBooking: Booking | null = null;

    constructor(lockingRequest: BookingRequest) {
        if (!lockingRequest.listingId || !lockingRequest.startDate || !lockingRequest.endDate) {
            throw new Error("Invalid booking request: Missing required fields.");
        }
        this.lockingRequest = lockingRequest;
    }

    private async checkExistingBooking() {
        try {
            this.existingBooking = await BookingModel.findOne({
                listingId: this.lockingRequest.listingId,
                $or: [
                    { startDate: { $lte: this.lockingRequest.endDate }, endDate: { $lte: this.lockingRequest.startDate } },
                    { startDate: { $lte: this.lockingRequest.endDate }, endDate: { $gte: this.lockingRequest.startDate } },
                    { startDate: { $gte: this.lockingRequest.endDate }, endDate: { $lte: this.lockingRequest.startDate } },
                    { startDate: { $gte: this.lockingRequest.endDate }, endDate: { $gte: this.lockingRequest.startDate } }
                ]
            }) as Booking | null;
        } catch (error) {
            throw new Error(`Error checking existing bookings for listingId: ${this.lockingRequest.listingId}. Error: ${error}`);
        }
    }

    private async isListingAvailable(): Promise<boolean> {
        if (!this.existingBooking) return true;
        switch (this.existingBooking.status) {
            case "Locked": {
                const lockedInterval = getInterval(
                    this.existingBooking.lockedAt,
                    toUnixTimestamp(new Date())
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

    private async createLock() {
        const session = await BookingModel.startSession();
        session.startTransaction();
        try {
            const createdBooking = await BookingModel.create(
                [{
                    ...this.lockingRequest,
                    id: uuid(),
                    status: "Locked",
                    lockedAt: toUnixTimestamp(new Date())
                }],
                { session },
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

    private async updateLock() {
        if (!this.existingBooking) return;

        const isAvailable = await this.isListingAvailable();

        if (!isAvailable) {
            logger.info("Listing is not available for update.");
            return null;
        }

        try {
            return await BookingModel.findOneAndUpdate(
                { id: this.existingBooking.id },
                {
                    ...this.lockingRequest,
                    lockedAt: toUnixTimestamp(new Date())
                },
                {
                    new: true,
                }
            );
        } catch (error) {
            return (`Error updating booking for id: ${this.existingBooking.id}. Error: ${error}`);
        }
    }

    async book() {
        await this.checkExistingBooking();

        if (!this.existingBooking) {
            try {
                const createdLock = await this.createLock();
                return { success: true, message: "Lock Created Successfully", booking: createdLock[0] };
            } catch (error) {
                return { success: false, message: `Error creating Lock: ${error}` };
            }
        }

        const isOpen = await this.isListingAvailable();

        if (!isOpen) {
            return { success: false, message: "Listing is not available currently" };
        }

        try {
            const updatedLock = await this.updateLock();
            if (updatedLock) {
                return { success: true, message: "Lock updated successfully", booking: updatedLock };
            } else {
                return { success: false, message: "Listing is not available currently" };
            }
        } catch (error) {
            return { success: false, message: `Error updating booking: ${error}` };
        }
    }

}
