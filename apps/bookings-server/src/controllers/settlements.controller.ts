import { sendResponse } from "@instapark/utils";
import { Request, Response } from "express";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";

export const getSettlements = async (req: Request, res: Response) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "pagination": { "limit": 11 },
                "filters": {
                    "order_ids":
                        ["order_101803242tLf64JLArnG17VJEvwg6hkcY1B",
                            "order_101803242tJnzuagFEXdei6gGh6XglB39RU"
                        ]
                }
            })
        };

        fetch('https://sandbox.cashfree.com/pg/split/order/vendor/recon', options)
            .then(response => response.json())
            .then(response => {
                sendResponse(res, 200, "Settlements fetched successfully", "SUCCESS", response)
            })
            .catch(error => {
                sendResponse(res, 500, `Failed to fetch settlements: ${error}`, "FAILURE", null)
            });

    } catch (error) {
        sendResponse(res, 500, `Failed to fetch Settlements: ${error}`, "FAILURE", null);
    }
};


export const createSettlement = async (req: Request, res: Response) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "vendor_id": "uniqueSampleVendorId",
                "adjustment_id": "21309823201",
                "amount": 1000,
                "type": "CREDIT",
                "remarks": "Testing"
            }
            )
        };

        fetch('https://sandbox.cashfree.com/pg/easy-split/vendors/uniqueSampleVendorId/adjustment', options)
            .then(response => response.json())
            .then(response =>
                sendResponse(res, 200, "Split success", "SUCCESS", response)
            )
            .catch(err => console.error(err));
    } catch (error) {
        sendResponse(res, 500, `Failed to fetch Settlements: ${error}`, "FAILURE", null);
    }
}

export const getOnDemanBalance = async (req: Request, res: Response) => {
    try {
        const { vendorId } = req.query;
        const options = {
            method: 'GET',
            headers: {
                'x-api-version': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
            }
        };

        fetch(`https://sandbox.cashfree.com/pg/easy-split/vendors/${vendorId}/balances`, options)
            .then(response => response.json())
            .then(response =>
                sendResponse(res, 200, "Balance fetched successfully", "SUCCESS", response)
            )
            .catch(err => console.error(err));
    } catch (error) {
        sendResponse(res, 500, `Internal Server error ${error}`, "FAILURE", null);
    }
}