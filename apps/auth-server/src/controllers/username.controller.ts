import { SessionRequest } from "@instapark/auth";
import { Response, sendResponse } from "@instapark/utils";
import { getUserMetadata, updateUserMetadata } from "supertokens-node/recipe/usermetadata";

export const upsertUsername = async (req: SessionRequest, res: Response) => {
    const session = req.session;
    const { first_name, last_name } = req.body;

    console.log(first_name, last_name);

    const userId = session?.getUserId() as string;

    await updateUserMetadata(userId, { first_name, last_name })
        .then((response) => {
            sendResponse(res, 200, "User Name added", "SUCCESS", response)
        })
        .catch((error) => {
            sendResponse(res, 500, "Failed to add User Name added", "FAILURE", error)
        })
}

export const getUsername = async (req: SessionRequest, res: Response) => {
    try {
        const session = req.session;
        const userId = session?.getUserId() as string;

        console.log(userId);


        const { metadata } = await getUserMetadata(userId);

        const firstName = metadata.first_name;

        const lastName = metadata.last_name
        sendResponse(
            res,
            200,
            "UserName fetched Succesfull",
            "SUCCESS",
            { first_name: firstName, last_name: lastName, full_name: firstName + " " + lastName }
        )
    } catch (error) {
        sendResponse(res, 500, "Error Fetching UserName", "FAILURE", error);
    }
}