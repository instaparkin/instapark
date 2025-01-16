import { Listing, Photo, PlaceType, Vehicle } from '@instapark/types';
import { AllowedVehicle, AvailableDate, Rating, Review } from '@instapark/types/src/Listing';
import mongoose, { Schema, Document } from 'mongoose';

// Mongoose Schemas
const ListingSchema: Schema = new Schema<Listing>({
  id: { type: String, required: true },
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
  basePrice: { type: Number, required: true },
  pphbi: { type: Number, required: true },
  pphcy: { type: Number, required: true },
  pphcr: { type: Number, required: true },
  plph: { type: Number, required: true },
  isOpen: { type: Boolean, required: true, default: true }
}, { timestamps: true })

const PhotoSchema: Schema = new Schema<Photo>({
  listingId: { type: String, ref: 'Listing', required: true },
  url: { type: String, required: true },
}, { timestamps: true });

const AllowedVehicleSchema: Schema = new Schema<AllowedVehicle>({
  listingId: { type: String, ref: 'Listing', required: true },
  vehicle: { type: String, enum: Vehicle, required: true }
});

const AvailableDateSchema: Schema = new Schema<AvailableDate>({
  listingId: { type: String, ref: 'Listing', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const ReviewSchema: Schema = new Schema<Review>({
  id: { type: String, required: true },
  listingId: { type: String, ref: 'Listing', required: true },
  location: { type: Number, min: 1, max: 5, required: true },
  cleanliness: { type: Number, min: 1, max: 5, required: true },
  communication: { type: Number, min: 1, max: 5, required: true },
  value: { type: Number, min: 1, max: 5, required: true },
  accuracy: { type: Number, min: 1, max: 5, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const RatingSchema: Schema = new Schema<Rating>({
  id: { type: String, required: true },
  listingId: { type: String, ref: 'Listing', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Mongoose Models
const ListingModel = mongoose.model<Listing>('Listing', ListingSchema);
const PhotoModel = mongoose.model<Photo>('Photo', PhotoSchema);
const AllowedVehicleModel = mongoose.model<AllowedVehicle>('AllowedVehicle', AllowedVehicleSchema);
const AvailableDateModel = mongoose.model<AvailableDate>('AvailableDate', AvailableDateSchema);
const ReviewModel = mongoose.model<Review>('Review', ReviewSchema);
const RatingModel = mongoose.model<Rating>('Rating', RatingSchema);

export { ListingModel, PhotoModel, AllowedVehicleModel, AvailableDateModel, ReviewModel, RatingModel };
