import { ApiResponse, BookedResponse, PaymentRequest } from "@instapark/types";
import mongoose from "mongoose";
import { BookingModel, BookingOTPModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";

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

            console.log(bookingUpdate);


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
            await PaymentModel.create(
                [
                    {
                        ...this.paymentRequest,
                        paymentType: "Booked",
                    },
                ],
                { session },
            );


            const otp = Math.floor(100000 + Math.random() * 900000);

            const options = {
                method: 'GET',
                headers: {
                    'x-api-version': "2025-01-01",
                    'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                    'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                }
            };

            fetch(`https://sandbox.cashfree.com/pg/orders/${this.paymentRequest.orderId}`, options)
                .then(response => response.json())
                .then(async response => {
                    if (response.data.order_status === "PAID") {
                        await BookingOTPModel.create([
                            {
                                bookingId: this.paymentRequest.bookingId,
                                otp,
                                expiresAt: bookingUpdate.endDate
                            }
                        ], { session })
                    }
                })
                .catch(err => console.error(err));

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
            throw new Error("Failed to create Booking" + error)
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
