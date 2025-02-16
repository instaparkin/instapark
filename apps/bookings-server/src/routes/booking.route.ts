import { Router } from "@instapark/utils";
import { book, getBookings, getOtp, lock, verifyBooking } from "../controllers/booking.controller";
import { completeBooking, createBooking } from "../controllers/payment.controller";
import { API_ENDPOINTS } from "@instapark/constants";
import { BookingModel } from "../models/booking.model";

const router = Router();

router.post(
    API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.COMPLETE,
    completeBooking);

router.post("/book", book)

router.post("/lock", lock);

router.get("/all", getBookings);

router.get("/otp/:bookingId", getOtp);

router.post("/otp/verify", verifyBooking)

export default router;