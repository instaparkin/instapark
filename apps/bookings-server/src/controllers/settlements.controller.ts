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
                        console.log(response);
                        response = response.data.slice(0, (response.limit / 2))
                        return sendResponse(res, 200, "Settlements fetched successfully", "SUCCESS", response)
                    case "vendor_commision":
                        console.log(response);
                        response = response.data.slice((response.limit / 2))
                        return sendResponse(res, 200, "Settlements fetched successfully", "SUCCESS", response)
                }
            })
            .catch(error => {
                sendResponse(res, 500, `Failed to fetch settlements: ${error}`, "FAILURE", null)
            });

    } catch (error) {
        sendResponse(res, 500, `Failed to fetch Settlements: ${error}`, "FAILURE", null);
    }
}