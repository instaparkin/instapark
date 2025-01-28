import { SessionRequest, supertokens } from "@instapark/auth";
import { Response, sendResponse } from "@instapark/utils";
import { getUserMetadata, updateUserMetadata } from "supertokens-node/recipe/usermetadata";
import { AuthMetadata, AuthMetadataRequest } from "@instapark/types";

export const upsertMetadata = async (req: SessionRequest, res: Response) => {
    const session = req.session;
    
    const { first_name, last_name, preferred_first_name } = req.body as AuthMetadataRequest;

    const userId = session?.getUserId() as string;

    await updateUserMetadata(userId, { first_name, last_name, preferred_first_name })
        .then((response) => {
            sendResponse(res, 200, "User Name added", "SUCCESS", response.metadata)
        })
        .catch((error) => {
            sendResponse(res, 500, "Failed to add User Name added", "FAILURE", error)
        })
}

export const getMetadata = async (req: SessionRequest, res: Response) => {
    try {
        const session = req.session;

        const userId = session?.getUserId() as string;

        const { metadata }: { metadata: AuthMetadataRequest } = await getUserMetadata(userId);

        const userInfo = await supertokens.getUser(userId)

        sendResponse<AuthMetadata>(
            res,
            200,
            "UserName fetched Successfully",
            "SUCCESS",
            {
                first_name: metadata.first_name,
                last_name: metadata.last_name,
                preferred_first_name: metadata.preferred_first_name,

                /**Populating other fields from session info */
                userId: userId,
                emails: userInfo?.emails ?? [],
                phoneNumbers: userInfo?.phoneNumbers ?? [],
                timeJoined: userInfo?.timeJoined as number
            }
        )
    } catch (error) {
        sendResponse(res, 500, "Error Fetching UserName", "FAILURE", error);
    }
}