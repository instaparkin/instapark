import { Listing, PlaceType, Vehicle, Rating, Review } from '@instapark/types';
import mongoose, { Schema, Document } from 'mongoose';
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
  pphbi: { type: Number, required: true },
  pphcy: { type: Number, required: true },
  pphcr: { type: Number, required: true },
  plph: { type: Number, required: true },
  photos: { type: [String], required: true },

  id: { type: String, required: true, default: uuid() },
  isOpen: { type: Boolean, required: true, default: true },
  rating: { type: Number, required: true, default: 0.00 },
  availableFrom: { type: Number, required: true, default: toUnixTimestamp(new Date()) },
  createdAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) },
  updatedAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) }
})

const ReviewSchema: Schema = new Schema<Review>({
  id: { type: String, required: true },
  listingId: { type: String, ref: 'listings', required: true },
  location: { type: Number, min: 1, max: 5, required: true },
  cleanliness: { type: Number, min: 1, max: 5, required: true },
  communication: { type: Number, min: 1, max: 5, required: true },
  value: { type: Number, min: 1, max: 5, required: true },
  accuracy: { type: Number, min: 1, max: 5, required: true },
  description: { type: String },
  createdAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) },
  updatedAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) }
});

const RatingSchema: Schema = new Schema<Rating>({
  id: { type: String, required: true },
  listingId: { type: String, ref: 'listings', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) },
  updatedAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) }
});

// Mongoose Models
const ListingModel = mongoose.model<Listing>('Listing', ListingSchema);
const ReviewModel = mongoose.model<Review>('Review', ReviewSchema);
const RatingModel = mongoose.model<Rating>('Rating', RatingSchema);

export { ListingModel, ReviewModel, RatingModel };
