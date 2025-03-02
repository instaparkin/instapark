import { BookingStatus, Vehicle } from './enums';
import { Listing } from './Listing';

export interface Booking {
	id: string;
	listingId: string;
	userId: string;
	startDate: number;
	endDate: number;
	status: BookingStatus;
	lockedAt: number;
	vehicle: Vehicle;
	basePrice: number;
	parkingPrice: number;
	totalPrice: number;
	ipFee: number;
	penalty: number;
	createdAt: number;
	updatedAt: number;
}

export type BookingRequest = Pick<
	Booking,
	| 'listingId'
	| 'userId'
	| 'startDate'
	| 'endDate'
	| 'basePrice'
	| 'totalPrice'
	| 'ipFee'
	| 'parkingPrice'
	| 'vehicle'
> & {
	customer: {
		customer_name: string;
		customer_email: string;
		customer_phone: string;
	};
	vendor_id: string;
};

export type BookingPaymentRequest = Pick<
	Booking,
	| 'listingId'
	| 'userId'
	| 'startDate'
	| 'endDate'
	| 'basePrice'
	| 'totalPrice'
	| 'ipFee'
	| 'parkingPrice'
	| 'vehicle'
	| 'id'
> & {
	customer: {
		customer_name: string;
		customer_email: string;
		customer_phone: string;
	};
	vendor_id: string;
};

export type BookingOTP = {
	bookingId: string;
	otp: number;
	expiresAt: number;
};

export type BookedResponse = {
	otp: number;
};

export interface BookingExtended extends Booking {
	listing: Listing;
}

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

export type LockedResponse = {
	bookingId: string;
	orderId: string;
	payment_session_id: string;
};
