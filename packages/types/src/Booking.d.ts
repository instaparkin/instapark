import { BookingStatus, PaymentType } from "./enums"

export interface Booking {
    id: string
    listingId: string
    userId: string
    startDate: Date
    endDate: Date
    status: BookingStatus
    lockedAt: Date
    createdAt: Date
    updatedAt: Date
}

export type BookingRequest = Pick<Booking, "listingId" | "userId" | "startDate" | "endDate">

export interface Payment {
    bookingId: string
    userId: string
    orderId: string
    cfPaymentId: string
    paymentType: PaymentType
    createdAt: Date
    updatedAt: Date
}