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

export type BookingRequest = Pick<Booking, "listingId" | "userId" | "startDate" | "endDate">

export interface Payment {
    bookingId: string
    userId: string
    orderId: string
    cfPaymentId: string
    paymentType: PaymentType
    createdAt: number
    updatedAt: number
}

export type PaymentRequest = Pick<Payment, "bookingId" | "userId" | "cfPaymentId" | "orderId">;