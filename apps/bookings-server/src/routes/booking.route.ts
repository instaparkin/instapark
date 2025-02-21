import { Router, sendResponse, Request } from "@instapark/utils";
import { book, earnings, getBookings, getOtp, lock, verifyBooking } from "../controllers/booking.controller";
import { completeBooking, createBooking } from "../controllers/payment.controller";
import { API_ENDPOINTS } from "@instapark/constants";
import { Cashfree } from "cashfree-pg";

const router = Router();

router.post(
    API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.COMPLETE,
    completeBooking);

router.post("/book", book)

router.post("/lock", lock);

router.get("/", getBookings);

router.get("/otp/:bookingId", getOtp);

router.post("/otp/verify", verifyBooking)

router.get("/earnings", earnings)

export default router;

