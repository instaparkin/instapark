import { Router } from "@instapark/utils";
import { book, lock } from "../controllers/booking.controller";
import { completeBooking, createBooking } from "../controllers/payment.controller";
import { API_ENDPOINTS } from "@instapark/constants";

const router = Router();

router.post(
    API_ENDPOINTS.BOOKINGS_SERVER.ROUTES.BOOKINGS.COMPLETE,
    completeBooking);


router.post("/book", book)

router.post("/lock", lock);

export default router;