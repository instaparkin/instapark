import { BookingStatus, PaymentType } from "./enums"

export interface Booking {
    id: string
    listingId: string
    userId: string
    startDate: number
    endDate: number
    status: BookingStatus
    lockedAt: number
    createdAt: number
    updatedAt: number
}

export type BookingRequest = Pick<Booking,
    "listingId" | "userId" | "startDate" | "endDate">

export type BookingOTP = {
    bookingId: string
    otp: number
    expiresAt: number
}

export type BookedResponse = {
    otp: number
}