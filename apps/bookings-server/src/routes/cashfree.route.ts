import { Router } from "@instapark/utils";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";

const router = Router();

router.post("/aadhar/verify", async (req, res) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                //These Credentials are different from the payment keys
                //You need to whitelist the IP
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: '{"otp":"111000","ref_id":"119277"}'
        };

        await fetch('https://sandbox.cashfree.com/verification/offline-aadhaar/verify', options)
            .then(response => response.json())
            .then(response =>
                res.send(response)
            )
            .catch(err => console.error(err));
    } catch (error) {
        res.send(error)
    }
})

router.post("/aadhar/otp", async (req, res) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                //These Credentials are different from the payment keys
                //You need to whitelist the IP
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: '{"aadhaar_number":"655675523712"}'
        };

        await fetch('https://sandbox.cashfree.com/verification/offline-aadhaar/otp', options)
            .then(response => response.json())
            .then(response =>
                res.send(response)
            )
            .catch(err => console.error(err));
    } catch (error) {
        res.send(error)
    }
})

router.post("/order", async (req, res) => {
 
})

export default router