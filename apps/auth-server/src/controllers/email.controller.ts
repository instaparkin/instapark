import { Response, sendResponse } from "@instapark/utils";
import { SessionRequest, supertokens } from "@instapark/auth";

export async function getUserEmailsFromID(req: SessionRequest, res: Response) {
    try {
        if (!req!.session) {
            return sendResponse(res, 401, "Unauthorised", "FAILURE");
        }
        const userId = req.session!.getUserId();
        const userInfo = await supertokens.getUser(userId)
        return sendResponse(res, 200, "User Emails Fetched Successfully", "SUCCESS", userInfo);
    } catch (error) {
        return sendResponse(res, 500, "Failed to fetch User Emails", "FAILURE", error);
    }
}