import { Schema, model } from "mongoose";
import { Booking, BookingStatus } from "@instapark/types";
import { toUnixTimestamp } from "@instapark/utils";
import { timeStamp } from "console";

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
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: BookingStatus
    },
    lockedAt: {
      type: Number,
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
    }
  }
);

export const BookingModel = model<Booking>("Booking", bookingSchema);
