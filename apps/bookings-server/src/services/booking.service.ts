import { ApiResponse, BookedResponse, BookingRequest, Payment, PaymentRequest } from "@instapark/types";
import mongoose from "mongoose";
import { BookingModel, BookingOTPModel } from "../models/booking.model";
import { PaymentModel } from "../models/payment.model";
import { Cashfree } from "cashfree-pg";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";
import { uuid } from "@instapark/utils";
import shortid from "shortid"

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

            let version = "2023-08-01"
            Cashfree.PGFetchOrder(version, this.paymentRequest.orderId).then(async (response) => {
                console.log('Order fetched successfully:', response.data.order_status)
                if (response.data.order_status === "PAID") {
                    // const options = {
                    //     method: 'POST',
                    //     headers: {
                    //         'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                    //         'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                    //         'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         "vendor_id": "uniqueSampleVendorId",
                    //         "adjustment_id": parseInt(uuid().replace(/\D/g, '').slice(0, 10), 10),
                    //         "amount": response?.data?.order_amount as number * 0.7,
                    //         "type": "CREDIT",
                    //         "remarks": "Testing"
                    //     }
                    //     )
                    // };
                    // fetch('https://sandbox.cashfree.com/pg/easy-split/vendors/uniqueSampleVendorId/adjustment', options)
                    //     .then(response => response.json())
                    //     .then(response =>
                    //         console.log(response)
                    //     )
                    //     .catch(err => console.error(err));
                }
            }).catch((error) => {
                console.error('Error:', error.response.data.message);
            });


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
