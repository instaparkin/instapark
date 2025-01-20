import { Schema, model } from "mongoose";
import { Booking, BookingStatus } from "@instapark/types";

const bookingSchema = new Schema<Booking>(
  {
    id: {
      type: String,
      required: true,
      auto: true
    },
    listingId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: BookingStatus
    },
    lockedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<Booking>("Booking", bookingSchema);
