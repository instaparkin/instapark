import { SessionRequest, UserMetadata } from "@instapark/auth";
import { Response } from "express";

export const upsertUserDetails = async (req: SessionRequest, res: Response) => {
    try {
        const { firstname, lastname } = req.body;
    
        if (!firstname || !lastname) {
            res.status(400).json({ error: "Firstname and lastname are required." });
        }

        const session = req.session;
        if (!session) {
            res.status(401).json({ error: "Unauthorized access. Session not found." });
        }

        const userId = session!.getUserId();
        if (!userId) {
            res.status(401).json({ error: "Unauthorized access. User ID not found." });
        }
        await UserMetadata?.updateUserMetadata(userId, { firstname, lastname });
        res.status(200).json({ message: "User metadata successfully updated." });
    } catch (error) {
        console.error("Error updating user metadata:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

/**
 * In order to delete a key just set it to null.
 * @param {SessionRequest}req - SessionRequest of supertokens
 * @param {Response}res - Express resposne
 * s 
 */
export const getUserDetails = async (req: SessionRequest, res: Response) => {
    try {
        const session = req.session;
        if (!session) {
            res.status(401).json({ error: "Unauthorized access. Session not found." });
        }

        const userId = session!.getUserId();
        if (!userId) {
            res.status(401).json({ error: "Unauthorized access. User ID not found." });
        }

        const metadata = await UserMetadata?.getUserMetadata(userId);
        res.status(200).json({ metadata });
    } catch (error) {
        console.error("Error reading user metadata:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

/**
 * Clears the entire metadata
 * @param req 
 * @param res 
 * s 
 */
export const deleteUserDetails = async (req: SessionRequest, res: Response) => {
    try {
        const session = req.session;
        if (!session) {
            res.status(401).json({ error: "Unauthorized access. Session not found." });
        }

        const userId = session!.getUserId();
        if (!userId) {
            res.status(401).json({ error: "Unauthorized access. User ID not found." });
        }

        await UserMetadata?.clearUserMetadata(userId);
        res.status(200).json({ message: "User metadata successfully cleared." });
    } catch (error) {
        console.error("Error clearing user metadata:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
