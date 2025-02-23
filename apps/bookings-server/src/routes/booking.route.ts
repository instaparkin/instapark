import { book, completeBooking, earnings, getBookings, getOtp, lock, verifyBooking } from "../controllers/booking.controller";
import { Router } from "express"

const BookingRouter = Router();

BookingRouter.post("/complete", completeBooking);

BookingRouter.post("/book", book)

BookingRouter.post("/lock", lock);

BookingRouter.get("/", getBookings);

BookingRouter.get("/otp/:bookingId", getOtp);

BookingRouter.post("/otp/verify", verifyBooking)

BookingRouter.get("/earnings", earnings)

export { BookingRouter };

