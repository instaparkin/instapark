import { Payment, PaymentType } from '@instapark/types';
import { toUnixTimestamp } from '@instapark/utils';
import { model, Schema } from 'mongoose';

export const paymentSchema = new Schema<Payment>({
	bookingId: {
		type: String,
		required: true,
		ref: 'Booking',
	},
	userId: {
		type: String,
		required: true,
	},
	orderId: {
		type: String,
		required: true,
	},
	paymentType: {
		type: String,
		enum: PaymentType,
		required: true,
	},
	createdAt: {
		type: Number,
		required: true,
		default: toUnixTimestamp(new Date()),
	},
	updatedAt: {
		type: Number,
		required: true,
		default: toUnixTimestamp(new Date()),
	},
});

export const PaymentModel = model<Payment>('Payment', paymentSchema);
