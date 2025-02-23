import { Request, Response } from "express";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";
import { sendResponse } from "@instapark/utils";

export const verifyAadhar = async (req: Request, res: Response) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                /**
                 * These Credentials are different from the payment keys
                 * You need to whitelist the IP
                 */
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "otp": "111000",
                "ref_id": "119277"
            })
        };

        await fetch('https://sandbox.cashfree.com/verification/offline-aadhaar/verify', options)
            .then(response => response.json())
            .then(response =>
                sendResponse(res, 200, "Aadhar verified Successfully", "SUCCESS", response)
            )
            .catch(error =>
                sendResponse(res, 500, `Error Verifying aadhar: ${error}`, "FAILURE", null)
            );
    } catch (error) {
        return sendResponse(res, 500, `Internal server Error: ${error}`, "FAILURE", null);
    }
}

export const aadhaarOTP = async (req: Request, res: Response) => {
    try {
        const { uidai } = req.query
        const options = {
            method: 'POST',
            headers: {
                /*
                * These Credentials are different from the payment keys
                * You need to whitelist the IP
                */
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "aadhaar_number": uidai
            })

        };

        await fetch('https://sandbox.cashfree.com/verification/offline-aadhaar/otp', options)
            .then(response => response.json())
            .then(response =>
                sendResponse(res, 200, "OTP sent to aadhar linked number  Successfully", "SUCCESS", response)
            )
            .catch(error => {
                sendResponse(res, 400, `Error generating OTP: ${error}`, "FAILURE", null);
            });
    } catch (error) {
        return sendResponse(res, 500, `Internal server Error: ${error}`, "FAILURE", null);
    }
}