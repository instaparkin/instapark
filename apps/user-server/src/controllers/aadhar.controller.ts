import { Request, Response } from 'express';
import { sendResponse } from '@instapark/utils';
import { AadhaarVerifyResponse } from '@instapark/types';
import { USER_SERVER_CONSTANTS } from '../constants/user-server-constants';
import { ProfileModel } from '../models/profile.model';

export const verifyAadhar = async (req: Request, res: Response) => {
	try {
		const { otp, ref_id, userId } = req.body;
		const options = {
			method: 'POST',
			headers: {
				/**
				 * These Credentials are different from the payment keys
				 * You need to whitelist the IP
				 */
				'x-client-id': USER_SERVER_CONSTANTS.CASHFREE.CASHFREE_SECURE_CLIENT_ID,
				'x-client-secret':
					USER_SERVER_CONSTANTS.CASHFREE.CASHFREE_SECURE_CLIENT_SECRET,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				otp,
				ref_id,
			}),
		};
		/**
		 * Change the status of Kyc Verified to TRUE
		 */
		await fetch(
			'https://sandbox.cashfree.com/verification/offline-aadhaar/verify',
			options,
		)
			.then((response) => response.json())
			.then(async (response: AadhaarVerifyResponse) => {
				if (response.status === 'VALID') {
					await ProfileModel.findOneAndUpdate(
						{ userId },
						{ $set: { 'kyc.verified': true } },
						{ new: true },
					);
				}
				sendResponse(
					res,
					200,
					'Aadhar verified Successfully',
					'SUCCESS',
					response,
				);
			})
			.catch((error) =>
				sendResponse(
					res,
					500,
					`Error Verifying aadhar: ${error}`,
					'FAILURE',
					null,
				),
			);
	} catch (error) {
		return sendResponse(
			res,
			500,
			`Internal server Error: ${error}`,
			'FAILURE',
			null,
		);
	}
};

export const aadhaarOTP = async (req: Request, res: Response) => {
	try {
		const { uidai } = req.body;
		const options = {
			method: 'POST',
			headers: {
				/*
				 * These Credentials are different from the payment keys
				 * You need to whitelist the IP
				 */
				'x-client-id': USER_SERVER_CONSTANTS.CASHFREE.CASHFREE_SECURE_CLIENT_ID,
				'x-client-secret':
					USER_SERVER_CONSTANTS.CASHFREE.CASHFREE_SECURE_CLIENT_SECRET,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				aadhaar_number: uidai,
			}),
		};

		await fetch(
			'https://sandbox.cashfree.com/verification/offline-aadhaar/otp',
			options,
		)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				sendResponse(
					res,
					200,
					'OTP sent to aadhar linked number successfully',
					'SUCCESS',
					response,
				);
			})
			.catch((error) => {
				sendResponse(
					res,
					400,
					`Error generating OTP: ${error}`,
					'FAILURE',
					null,
				);
			});
	} catch (error) {
		return sendResponse(
			res,
			500,
			`Internal server Error: ${error}`,
			'FAILURE',
			null,
		);
	}
};
