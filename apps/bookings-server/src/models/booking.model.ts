import { Schema, model } from "mongoose";
import { Booking, BookingStatus, BookingOTP, Vehicle } from "@instapark/types";
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
    basePrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    parkingPrice: {
      type: Number,
      required: true
    },
    ipFee: {
      type: Number,
      required: true
    },
    penalty: {
      type: Number,
      required: false,
      default: 0
    },
    vehicle: {
      type: String,
      required: true,
      enum: Vehicle
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
