import mongoose from 'mongoose';
import { Profile } from '@instapark/types';

const profileSchema = new mongoose.Schema<Profile>(
	{
		userId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		timeJoined: {
			type: Number,
			required: true,
		},
		phoneNumber: {
			type: String,
		},
		kyc: {
			uidai: {
				type: String,
			},
			verified: {
				type: Boolean,
			},
		},
		country: {
			type: String,
			default: 'India',
		},
		state: {
			type: String,
			default: 'Karnataka',
		},
		district: {
			type: String,
			default: 'Bengaluru',
		},
		city: {
			type: String,
			default: 'Bengaluru',
		},
		street: {
			type: String,
		},
		pincode: {
			type: Number,
		},
		name: {
			type: String,
		},
		landmark: {
			type: String,
		},
	},
	{ timestamps: true },
);

const ProfileModel = mongoose.model('Profile', profileSchema);

export { ProfileModel };
