import { sendResponse } from '@instapark/utils';
import { Request, Response } from 'express';
import { ProfileModel } from '../models/profile.model';
import { Profile } from '@instapark/types';

export const upsertProfile = async (req: Request, res: Response) => {
	try {
		const profileRequest = req.body as Partial<Profile>;

		if (!profileRequest.userId) {
			return sendResponse(res, 400, 'User ID is required', 'FAILURE', null);
		}
		const updateFields: Partial<Profile> = {
			...(profileRequest.userId && { userId: profileRequest.userId }),
			...(profileRequest.firstName && { firstName: profileRequest.firstName }),
			...(profileRequest.lastName && { lastName: profileRequest.lastName }),
			...(profileRequest.email && { email: profileRequest.email }),
			...(profileRequest.timeJoined && {
				timeJoined: profileRequest.timeJoined,
			}),
			...(profileRequest.phoneNumber && {
				phoneNumber: profileRequest.phoneNumber,
			}),
			...(profileRequest.kyc?.uidai && {
				kyc: {
					uidai: profileRequest.kyc.uidai,
					verified: profileRequest.kyc.verified ?? false,
				},
			}),
			...(profileRequest.country && { country: profileRequest.country }),
			...(profileRequest.state && { state: profileRequest.state }),
			...(profileRequest.district && { district: profileRequest.district }),
			...(profileRequest.city && { city: profileRequest.city }),
			...(profileRequest.street && { street: profileRequest.street }),
			...(profileRequest.pincode && { pincode: profileRequest.pincode }),
			...(profileRequest.name && { name: profileRequest.name }),
			...(profileRequest.landmark && { landmark: profileRequest.landmark }),
		};

		await ProfileModel.updateOne(
			{ userId: profileRequest.userId },
			{ $set: updateFields },
			{ upsert: true },
		);

		return sendResponse(
			res,
			200,
			'Profile updated successfully',
			'SUCCESS',
			null,
		);
	} catch (error) {
		return sendResponse(
			res,
			500,
			`Internal Server Error: ${error}`,
			'FAILURE',
			null,
		);
	}
};

export const getProfile = async (req: Request, res: Response) => {
	try {
		const { userId } = req.query;
		console.log(userId);

		if (!userId) {
			return sendResponse(res, 400, 'User ID is required', 'FAILURE', null);
		}

		const profile = await ProfileModel.findOne({
			userId,
		});
		console.log(profile);

		return sendResponse(
			res,
			200,
			'Profile details fetched successfully',
			'SUCCESS',
			profile,
		);
	} catch (error) {
		return sendResponse(
			res,
			500,
			`Internal Server Error: ${error}`,
			'FAILURE',
			null,
		);
	}
};
