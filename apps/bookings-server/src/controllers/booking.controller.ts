import { sendResponse, toUnixTimestamp } from "@instapark/utils";
import { BookingRequest, Payment, PaymentRequest } from "@instapark/types";
import { LockingService } from "../services/locking.service";
import { BookingService } from "../services/booking.service";
import { BookingModel, BookingOTPModel } from "../models/booking.model";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Request, Response } from "express";
import { PaymentModel } from "../models/payment.model";
import mongoose from "mongoose";

dayjs.extend(utc);
dayjs.extend(timezone);

export const lock = async (req: Request, res: Response) => {
    try {
        const lockingRequest = req.body as BookingRequest;

        const lockingService = new LockingService(lockingRequest);

        const result = await lockingService.book();

        if (result.success && result.booking && result.order) {
            sendResponse(res, 200, result.message, "SUCCESS", {
                bookingId: result.booking.id,
                orderId: result.order.order_id,
                payment_session_id: result.order.payment_session_id
            });
        } else {
            sendResponse(res, 200, result.message, "FAILURE", null);
        }
    } catch (error) {
        sendResponse(res, 500, `Error creating Booking: ${error}`, "FAILURE", null);
    }
}

export const book = async (req: Request, res: Response) => {
    try {
        const bookingRequest = req.body as PaymentRequest;

        const bookingService = new BookingService(bookingRequest);

        const result = await bookingService.book();

        if (result.status == "SUCCESS") {
            return sendResponse(res, 200, result.message, "SUCCESS", result.data);
        } else {
            return sendResponse(res, 200, result.message, "FAILURE", result);
        }

    } catch (error) {
        sendResponse(res, 500, `Error creating Booking: ${error}`, "FAILURE", null);
    }
}

export const completeBooking = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payment = req.body as Pick<Payment, "bookingId" | "userId" | "orderId">;
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

export const getBookings = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, listingId, userId, status } =
            req.query as unknown as {
                startDate: number,
                endDate: number,
                listingId: string,
                userId: string,
                status: string
            };

        const bookings = await BookingModel.find(
            {
                ...(startDate ? { startDate } : {}),
                ...(endDate ? { endDate } : {}),
                ...(listingId ? { listingId } : {}),
                ...(userId ? { userId } : {}),
                ...(status ? { status: { $in: [status] } } : {}),
            },
            { _id: 0, __v: 0 }
        );

        return sendResponse(res, 200, "Bookings fetched successfully", "SUCCESS", bookings);
    } catch (error) {
        sendResponse(res, 500, `Failed to get Bookings: ${error}`, "FAILURE", null);
    }
};

export const getOtp = async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.query as { bookingId: string }
        const otp = await BookingOTPModel.find({ bookingId })
        return sendResponse(res, 200, "OTP  fetched successfully", "SUCCESS", { otp: otp[0]?.otp });
    } catch (error) {
        sendResponse(res, 500, `Error Fetching OTP ${error}`, "FAILURE", null);
    }
}

export const verifyBooking = async (req: Request, res: Response) => {
    try {
        const { otp, bookingId } = req.body;

        console.log(req.body);


        const bookingOTP = await BookingOTPModel.find({
            bookingId: bookingId,
            otp: otp,
            expiresAt: { $gt: toUnixTimestamp(new Date()) }
        });

        if (bookingOTP.length !== 0) {
            await BookingModel.findOneAndUpdate({
                id: bookingId
            }, {
                status: "OnGoing"
            })
            return sendResponse(res, 200, "Booking verified successfully", "SUCCESS", null);
        } else {
            return sendResponse(res, 400, "Failed to verify Booking", "FAILURE", null);
        }
    } catch (error) {
        return sendResponse(res, 500, `Failed to verify Booking: ${error}`, "FAILURE", null);
    }
};

export const earningsStats = async (req: Request, res: Response) => {
    try {
        const { listingIds } = req.query as { listingIds: string[] };
        console.log(listingIds);

        if (!listingIds || !Array.isArray(listingIds) || listingIds.length === 0) {
            return sendResponse(res, 400, "Missing or invalid listingIds", "FAILURE", null);
        }

        const now = dayjs();
        const startOfCurrentMonth = now.startOf("month").unix();
        const endOfCurrentMonth = now.endOf("month").unix();

        const startOfPreviousMonth = now.subtract(1, "month").startOf("month").unix();
        const endOfPreviousMonth = now.subtract(1, "month").endOf("month").unix();

        // Monthly earnings comparison
        const result = await BookingModel.aggregate([
            { $match: { listingId: { $in: listingIds } } },
            {
                $facet: {
                    currentMonth: [
                        { $match: { createdAt: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth } } },
                        {
                            $group: {
                                _id: null,
                                totalBookings: { $sum: 1 },
                                totalRevenue: { $sum: "$totalPrice" },
                                totalNetProfit: { $sum: { $subtract: ["$totalPrice", "$ipFee"] } },
                                avgBookingValue: { $avg: "$totalPrice" }
                            }
                        }
                    ],
                    previousMonth: [
                        { $match: { createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth } } },
                        {
                            $group: {
                                _id: null,
                                totalBookings: { $sum: 1 },
                                totalRevenue: { $sum: "$totalPrice" },
                                totalNetProfit: { $sum: { $subtract: ["$totalPrice", "$ipFee"] } },
                                avgBookingValue: { $avg: "$totalPrice" }
                            }
                        }
                    ]
                }
            }
        ]);

        const currentMonthData = result[0].currentMonth.length > 0 ? result[0].currentMonth[0] : {
            totalBookings: 0,
            totalRevenue: 0,
            totalNetProfit: 0,
            avgBookingValue: 0
        };

        const previousMonthData = result[0].previousMonth.length > 0 ? result[0].previousMonth[0] : {
            totalBookings: 0,
            totalRevenue: 0,
            totalNetProfit: 0,
            avgBookingValue: 0
        };

        const percentageChange = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return ((current - previous) / previous) * 100;
        };

        const netPL = {
            totalBookingsPLPercent: percentageChange(currentMonthData.totalBookings, previousMonthData.totalBookings),
            totalRevenuePLPercent: percentageChange(currentMonthData.totalRevenue, previousMonthData.totalRevenue),
            totalNetProfitPLPercent: percentageChange(currentMonthData.totalNetProfit, previousMonthData.totalNetProfit),
            avgBookingValuePLPercent: percentageChange(currentMonthData.avgBookingValue, previousMonthData.avgBookingValue)
        };

        return sendResponse(res, 200, "Booking statistics fetched successfully", "SUCCESS", {
            currentMonth: currentMonthData,
            previousMonth: previousMonthData,
            netPL,
        });
    } catch (error) {
        return sendResponse(res, 500, `Failed to calculate booking statistics: ${error}`, "FAILURE", null);
    }
};
