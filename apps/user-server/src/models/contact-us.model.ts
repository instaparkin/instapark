import { ContactUs } from '@instapark/types';
import { toUnixTimestamp } from '@instapark/utils';
import mongoose from 'mongoose';

const ContactUsSchema = new mongoose.Schema<ContactUs>({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
	},
	message: {
		type: String,
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

const ContactUsModel = mongoose.model('ContactUs', ContactUsSchema);

export { ContactUsModel };
