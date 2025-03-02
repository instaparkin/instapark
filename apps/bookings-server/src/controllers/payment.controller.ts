import { sendResponse } from '@instapark/utils';
import { PaymentModel } from '../models/payment.model';
import { Request, Response } from 'express';

export const getPayments = async (req: Request, res: Response) => {
	try {
		const { bookingId, userId, orderId, paymentType } = req.query;
		const payments = await PaymentModel.find(
			{
				...(bookingId ? { bookingId } : {}),
				...(orderId ? { orderId } : {}),
				...(paymentType ? { paymentType } : {}),
				...(userId ? { userId } : {}),
			},
			{ _id: 0, __v: 0 },
		);
		return sendResponse(
			res,
			200,
			'Payments fetched successfully',
			'SUCCESS',
			payments,
		);
	} catch (error) {
		sendResponse(
			res,
			500,
			'Internal Server Error',
			'FAILURE',
			error instanceof Error ? error.message : 'An unknown error occurred',
		);
	}
};
