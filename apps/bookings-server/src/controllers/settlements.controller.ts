import { sendResponse } from "@instapark/utils";
import { Request, Response } from "express";
import { BOOKINGS_SERVER_CONSTANTS } from "../constants/bookings-server-constants";

export const getSettlements = async (req: Request, res: Response) => {
    try {
        const { orderIds, limit, entity_type } = req.query as unknown as {
            limit: string
            orderIds: string[]
            entity_type: "vendor_commision" | "transaction"
        }

        if (!entity_type) {
            return sendResponse(res, 400, "Entity Type is required", "FAILURE", null)
        }
        const options = {
            method: 'POST',
            headers: {
                'x-api-version': "2025-01-01",
                'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
                'x-client-secret': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "pagination": { "limit": parseInt(limit) },
                "filters": {
                    "order_ids": orderIds
                }
            })
        };

        fetch('https://sandbox.cashfree.com/pg/split/order/vendor/recon', options)
            .then(response => response.json())
            .then(response => {
                switch (entity_type) {
                    case "transaction":
                        response = response.data.slice(0, (response.limit / 2))
                        console.log(response);

                        return sendResponse(res, 200, "Settlements fetched successfully", "SUCCESS", response)
                    case "vendor_commision":
                        response = response.data.slice((response.limit / 2))
                        console.log(response);
                        return sendResponse(res, 200, "Settlements fetched successfully", "SUCCESS", response)
                }
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