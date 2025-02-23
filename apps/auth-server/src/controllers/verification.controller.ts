import { SessionRequest } from "@instapark/auth";
import { sendResponse } from "@instapark/utils";
import { Response } from "express";

export const verifyUser = (req: SessionRequest, res: Response) => {
    try {
        const userId = req.session?.getUserId() ?? null;
        console.log(userId);
        sendResponse(res, 200, "UserId found", "SUCCESS", { userId })
    } catch (error) {
        sendResponse(res, 500, "Internal server error", "FAILURE", error)
    }
}