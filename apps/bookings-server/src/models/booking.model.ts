import { Schema, model } from "mongoose";
import { Booking, BookingStatus, BookingOTP } from "@instapark/types";
import { toUnixTimestamp } from "@instapark/utils";

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

const bookingOTPSchema = new Schema<BookingOTP>(
  {
    bookingId: {
      type: String,
      required: true
    },
    otp: {
      type: Number,
      required: true
    },
    expiresAt: {
      type: Number,
      required: true
    }
  }
)
const BookingModel = model<Booking>
  ("Booking", bookingSchema);

const BookingOTPModel = model<BookingOTP>
  ("BookingOTP", bookingOTPSchema);

export { BookingModel, BookingOTPModel }
