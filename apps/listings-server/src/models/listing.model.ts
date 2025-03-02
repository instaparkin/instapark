import { Listing, PlaceType } from '@instapark/types';
import mongoose, { Schema } from 'mongoose';
import { toUnixTimestamp, uuid } from '@instapark/utils';

const ListingSchema: Schema = new Schema<Listing>({
	userId: { type: String, required: true },
	type: { type: String, enum: PlaceType, required: true },
	country: { type: String, required: true },
	state: { type: String, required: true },
	district: { type: String, required: true },
	city: { type: String, required: true },
	street: { type: String, required: true },
	pincode: { type: Number, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	name: { type: String },
	landmark: { type: String },
	allowedVehicles: { type: [String] },
	basePrice: { type: Number, required: true },
	pphbi: { type: Number },
	pphcy: { type: Number },
	pphcr: { type: Number },
	plph: { type: Number, required: true },
	photos: { type: [String], required: true },

	id: { type: String, required: true, default: uuid() },
	isOpen: { type: Boolean, required: true, default: true },
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

const ListingModel = mongoose.model<Listing>('Listing', ListingSchema);

export { ListingModel };
