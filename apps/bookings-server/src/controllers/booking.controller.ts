import { Request, Response, sendResponse } from "@instapark/utils";
import { BookingRequest, Payment, PaymentRequest } from "@instapark/types";
import { LockingService } from "../services/locking.service";
import { bookingProducer } from "@instapark/kafka"
import { BookingService } from "../services/booking.service";

export const lock = async (req: Request, res: Response) => {
    try {
        const lockingRequest = req.body as BookingRequest;

        const lockingService = new LockingService(lockingRequest);

        const result = await lockingService.book();


        if (result.success && result.booking) {
            sendResponse(res, 200, result.message, "SUCCESS", result.booking);

        } else {
            sendResponse(res, 400, result.message, "FAILURE", null);
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
            bookingProducer({
                type: "POST",
                data: result.data as Payment,
                partition: 0
            })
            return sendResponse(res, 200, result.message, "SUCCESS", result.data);

        } else {
            return sendResponse(res, 400, result.message, "FAILURE", result);
        }

    } catch (error) {
        sendResponse(res, 500, `Error creating Booking: ${error}`, "FAILURE", null);
    }
}