import { sendResponse } from "@instapark/utils";
import { Request, Response } from "express";
import { ProfileModel } from "../models/profile.model";
import { Profile } from "@instapark/types";

export const upsertProfile = async (req: Request, res: Response) => {
    try {
        const profileRequest = req.body as Partial<Profile>;

        if (!profileRequest.userId) {
            return sendResponse(res, 400, "User ID is required", "FAILURE", null);
        }

        const updateFields: Partial<Profile> = {
            ...(profileRequest.phoneNumbers && { phoneNumbers: profileRequest.phoneNumbers }),
            ...(profileRequest.kyc?.uidai && { kyc: { uidai: profileRequest.kyc.uidai, verified: profileRequest.kyc.verified ?? false } }),
            ...(profileRequest.country && { country: profileRequest.country }),
            ...(profileRequest.state && { state: profileRequest.state }),
            ...(profileRequest.district && { district: profileRequest.district }),
            ...(profileRequest.city && { city: profileRequest.city }),
            ...(profileRequest.street && { street: profileRequest.street }),
            ...(profileRequest.pincode && { pincode: profileRequest.pincode }),
            ...(profileRequest.latitude && { latitude: profileRequest.latitude }),
            ...(profileRequest.longitude && { longitude: profileRequest.longitude }),
            ...(profileRequest.name && { name: profileRequest.name }),
            ...(profileRequest.landmark && { landmark: profileRequest.landmark }),
        };

        await ProfileModel.updateOne(
            { userId: profileRequest.userId },
            { $set: updateFields },
            { upsert: true }
        );

        return sendResponse(res, 200, "Profile updated successfully", "SUCCESS", null);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error", "FAILURE", null);
    }
};
