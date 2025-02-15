import { Request, Response, sendResponse } from "@instapark/utils";
import { PaymentModel } from "../models/payment.model";
import { BookingModel } from "../models/booking.model";
import { Payment } from "@instapark/types";
import mongoose from "mongoose";

export const createBooking = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payment = req.body as Pick<Payment, "bookingId" | "userId" | "paymentSessionId" | "orderId">;
        if (!payment) {
            return sendResponse(
                res,
                400,
                "Missing required fields: bookingId, cfPaymentId, or orderId",
                "FAILURE"
            );
        }

        const bookingUpdate = await BookingModel.findOneAndUpdate(
            { id: payment.bookingId, userId: payment.userId, status: "Locked" },
            { status: "Booked" },
            { session, new: true }
        );

        if (!bookingUpdate) {
            await session.abortTransaction();
            return sendResponse(
                res,
                404,
                `Booking with ID ${payment.bookingId} not found`,
                "FAILURE"
            );
        }

        const newPayment = await PaymentModel.create(
            [
                {
                    ...payment,
                    paymentType: "Booked",
                },
            ],
            { session },
        );

        await session.commitTransaction();
        session.endSession();
        sendResponse(
            res,
            201,
            "Booking and payment created successfully",
            "SUCCESS",
            newPayment
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        sendResponse(
            res,
            500,
            "Internal Server Error",
            "FAILURE",
            error instanceof Error ? error.message : "An unknown error occurred"
        );
    }
};

export const completeBooking = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payment = req.body as Pick<Payment, "bookingId" | "userId" | "paymentSessionId" | "orderId">;
        if (!payment) {
            return sendResponse(
                res,
                400,
                "Missing required fields: bookingId, cfPaymentId, or orderId",
                "FAILURE"
            );
        }

        const bookingUpdate = await BookingModel.findOneAndUpdate(
            { id: payment.bookingId, userId: payment.userId, status: "Booked" },
            { status: "Completed" },
            { session, new: true }
        );

        if (!bookingUpdate) {
            await session.abortTransaction();
            return sendResponse(
                res,
                404,
                `Booking with ID ${payment.bookingId} not found`,
                "FAILURE"
            );
        }

        const newPayment = await PaymentModel.create(
            [
                {
                    ...payment,
                    paymentType: "Completed",
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();
        sendResponse(
            res,
            201,
            "Booking and payment created successfully",
            "SUCCESS",
            newPayment
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        sendResponse(
            res,
            500,
            "Internal Server Error",
            "FAILURE",
            error instanceof Error ? error.message : "An unknown error occurred"
        );
    }
};
