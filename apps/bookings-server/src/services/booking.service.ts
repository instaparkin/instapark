import { ApiResponse, BookedResponse, BookingRequest, Payment, PaymentRequest } from "@instapark/types";
import mongoose from "mongoose";
import { BookingModel, BookingOTPModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { Cashfree } from "cashfree-pg";
import { sign } from "jsonwebtoken"

export class BookingService {
    private paymentRequest: PaymentRequest

    constructor(paymentRequest: PaymentRequest) {
        this.paymentRequest = paymentRequest
    }

    private async createBooking(): Promise<ApiResponse<BookedResponse>> {
        const session = await mongoose.startSession();
        session.startTransaction();
        /**
         * Update the booking status
         */
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

            /**
             * Create the payment record
             */
            let version = "2023-08-01"
            Cashfree.PGFetchOrder(version, this.paymentRequest.orderId).then((response) => {
                console.log('Order fetched successfully:', response.data);
            }).catch((error) => {
                console.error('Error:', error.response.data.message);
            });

            await PaymentModel.create(
                [
                    {
                        ...this.paymentRequest,
                        paymentType: "Booked",
                    },
                ],
                { session },
            );


            /**
             * OTP is generated and sent to the buyer
             */
            const otp = Math.floor(100000 + Math.random() * 900000);

            await BookingOTPModel.create([
                {
                    bookingId: this.paymentRequest.bookingId,
                    otp,
                    expiresAt: bookingUpdate.endDate
                }
            ], { session })

            /**
             * Commit and send the response
             */
            await session.commitTransaction();
            session.endSession();
            return {
                message: "Booking and payment created successfully",
                status: "SUCCESS",
                data: {
                    otp
                }
            }
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new Error("Failed to create Booking")
        }
    };

    async book(): Promise<ApiResponse<BookedResponse>> {
        if (!this.paymentRequest) {
            return {
                message: "Invalid input",
                status: "FAILURE"
            }
        }
        return await this.createBooking();
    }
}
