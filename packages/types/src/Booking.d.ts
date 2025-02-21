import { BookingStatus, PaymentType } from "./enums"
import { Listing } from "./Listing"

export interface Booking {
    id: string
    listingId: string
    userId: string
    startDate: number
    endDate: number
    status: BookingStatus
    lockedAt: number
    basePrice: number
    parkingPrice: number
    totalPrice: number
    ipFee: number
    penalty: number
    verified: boolean
    createdAt: number
    updatedAt: number
}

export type BookingRequest = Pick<Booking,
    "listingId" | "userId" | "startDate" | "endDate" | "basePrice" | "totalPrice" | "ipFee" | "parkingPrice">

export type BookingOTP = {
    bookingId: string
    otp: number
    expiresAt: number
}

export type BookedResponse = {
    otp: number
}

export interface BookingExtended extends Booking {
    listing: Listing
}

export type TimeFrame = "week" | "Month" | "Year"

export type Earnings = {
    currentMonth: {
        totalBookings: number;
        totalRevenue: number;
        totalNetProfit: number;
        avgBookingValue: number;
    };
    previousMonth: {
        totalBookings: number;
        totalRevenue: number;
        totalNetProfit: number;
        avgBookingValue: number;
    };
    netPL: {
        totalBookingsPLPercent: number;
        totalRevenuePLPercent: number;
        totalNetProfitPLPercent: number;
        avgBookingValuePLPercent: number;
    };
};
