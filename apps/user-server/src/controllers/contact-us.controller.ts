import { ContactUsRequest } from '@instapark/types';
import { sendResponse } from '@instapark/utils';
import { Request, Response } from 'express';
import { ContactUsModel } from '../models/contact-us.model';

export const contactUs = async (req: Request, res: Response) => {
	try {
		const body = req.body as ContactUsRequest;

		await ContactUsModel.create([body]);

		return sendResponse(
			res,
			201,
			'Contact request submitted successfully',
			'SUCCESS',
			null,
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
