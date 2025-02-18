import { Review } from "@instapark/types";
import { toUnixTimestamp } from "@instapark/utils";
import mongoose, { Schema } from "mongoose";

const ReviewSchema: Schema = new Schema<Review>({
    id: { type: String, required: true },
    listingId: { type: String, ref: 'listings', required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    location: { type: Number, min: 1, max: 5, required: true },
    cleanliness: { type: Number, min: 1, max: 5, required: true },
    communication: { type: Number, min: 1, max: 5, required: true },
    value: { type: Number, min: 1, max: 5, required: true },
    accuracy: { type: Number, min: 1, max: 5, required: true },
    description: { type: String },
    createdAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) },
    updatedAt: { type: Number, required: true, default: toUnixTimestamp(new Date()) }
  });

export const ReviewModel = mongoose.model<Review>('Review', ReviewSchema);
