import { Router, sendResponse, Request } from "@instapark/utils";
import { book, getBookings, getOtp, lock, verifyBooking } from "../controllers/booking.controller";
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

router.post("/vendor", (req: Request, res) => {
    Cashfree.XClientId = "TEST10180324795c6ed369800e535fc242308101";
    Cashfree.XClientSecret = "cfsk_ma_test_ea216f531ab789cd1bb6c0d98bf6f4a6_179a58b2";
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

    Cashfree.PGESCreateVendors("2023-08-01", "1", "2", {
        "vendor_id": "vendortest123",
        "status": "ACTIVE",
        "name": "customer",
        "email": "johndoe@cashfree.com",
        "phone": "9876543210",
        "kyc_details": [{
            "uidai": 753624181019,
            "pan": "BIAPA2934N",
        }]
    })
        .then(response => sendResponse(res, 201, "Vendor craeted Successfully", "SUCCESS", null))
        .catch(error => sendResponse(res, 500, "Internal server error", "FAILURE", error))
})
export default router;

