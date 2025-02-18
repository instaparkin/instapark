import { sendResponse } from "@instapark/utils";
import { Request, Response } from "express";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";

export const getSettlements = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.query;

        const options = {
            method: 'GET',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET
            }
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/orders/${orderId}`, options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200, "Settlements successfully fetched", "SUCCESS", response);
            })
            .catch(error => {
                sendResponse(res, 404, `Failed to fetch Settlements: ${error}`, "SUCCESS", null);
            });

    } catch (error) {
        sendResponse(res, 500, `Failed to fetch Settlements: ${error}`, "FAILURE", null);
    }
};
