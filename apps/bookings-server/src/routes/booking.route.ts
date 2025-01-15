import { Router } from "@instapark/utils";
import { createLock } from "../controllers/booking.controller";
import { completeBooking, createBooking } from "../controllers/payment.controller";

const router = Router();

router.post("/lock", createLock);

router.post("/create", createBooking);

router.post("/complete", completeBooking);

export default router;