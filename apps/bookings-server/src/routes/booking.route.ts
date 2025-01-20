import { Router } from "@instapark/utils";
import { book, createLock } from "../controllers/booking.controller";
import { completeBooking, createBooking } from "../controllers/payment.controller";
import { API_ENDPOINTS } from "@instapark/constants";

const router = Router();

router.post(
    API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.LOCK,
    createLock);

router.post(
    API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.CREATE,
    createBooking);

router.post(
    API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.COMPLETE,
    completeBooking);

router.post("/", book);

export default router;