import { ApiResponse, BookingRequest, Payment, PaymentRequest } from "@instapark/types";
import mongoose from "mongoose";
import { BookingModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";

export class BookingService {
    private paymentRequest: PaymentRequest

    constructor(paymentRequest: PaymentRequest) {
        this.paymentRequest = paymentRequest
    }

    private async createBooking(): Promise<ApiResponse<Payment>> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const bookingUpdate = await BookingModel.findOneAndUpdate(
                { id: this.paymentRequest.bookingId, userId: this.paymentRequest.userId, status: "Locked" },
                { status: "Booked" },
                { session, new: true }
            );

            if (!bookingUpdate) {
                await session.abortTransaction();
                return {
                    message: `Booking with ID ${this.paymentRequest.bookingId} not found`,
                    status: "FAILURE",
                }
            }

            const newPayment = await PaymentModel.create(
                [
                    {
                        ...this.createBooking,
                        paymentType: "Booked",
                    },
                ],
                { session },
            );

            console.log(newPayment);
            

            await session.commitTransaction();
            session.endSession();
            return {
                message: "Booking and payment created successfully",
                status: "SUCCESS",
                data: newPayment[0]
            }
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new Error("Failed to create Booking")
        }
    };

    async book(): Promise<ApiResponse<Payment>> {
        if (!this.paymentRequest) {
            return {
                message: "Invalid input",
                status: "FAILURE"
            }
        }
        return await this.createBooking();
    }
}
