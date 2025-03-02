import { Booking, BookingRequest, Order } from '@instapark/types';
import { BookingModel } from '../models/booking.model';
import { getInterval, toUnixTimestamp } from '@instapark/utils';
import { v4 as uuid } from 'uuid';
import { BOOKINGS_SERVER_CONSTANTS } from '../constants/bookings-server-constants';

const LOCK_INTERVAL = 0.5 * 60;

export class LockingService {
	private lockingRequest: BookingRequest;
	private existingBooking: Booking | null = null;

	constructor(lockingRequest: BookingRequest) {
		if (
			!lockingRequest.listingId ||
			!lockingRequest.startDate ||
			!lockingRequest.endDate
		) {
			throw new Error('Invalid booking request: Missing required fields.');
		}
		this.lockingRequest = lockingRequest;
	}

	private async checkExistingBooking() {
		try {
			this.existingBooking = (await BookingModel.findOne({
				listingId: this.lockingRequest.listingId,
				startDate: { $lte: this.lockingRequest.endDate },
				endDate: { $gte: this.lockingRequest.startDate },
			})) as Booking | null;
		} catch (error) {
			throw new Error(
				`Error checking existing bookings for listingId: ${this.lockingRequest.listingId}. Error: ${error}`,
			);
		}
	}

	private async isListingAvailable(): Promise<boolean> {
		if (!this.existingBooking) return true;
		switch (this.existingBooking.status) {
			case 'Locked': {
				const lockedInterval = getInterval(
					this.existingBooking.lockedAt,
					toUnixTimestamp(new Date()),
				);
				return lockedInterval > LOCK_INTERVAL;
			}
			case 'Booked':
			case 'Completed':
				return false;
			default:
				return false;
		}
	}

	private async createLock() {
		const session = await BookingModel.startSession();
		session.startTransaction();
		try {
			const [createdBooking] = await BookingModel.create(
				[
					{
						...this.lockingRequest,
						id: uuid(),
						status: 'Locked',
						lockedAt: toUnixTimestamp(new Date()),
					},
				],
				{ session },
			);
			await session.commitTransaction();
			return createdBooking as Booking;
		} catch (error) {
			await session.abortTransaction();
			return `Error creating booking: ${error}`;
		} finally {
			session.endSession();
		}
	}

	private async createOrder(): Promise<Order> {
		const options = {
			method: 'POST',
			headers: {
				'x-api-version':
					BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_API_VERSION,
				'x-client-id': BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_ID,
				'x-client-secret':
					BOOKINGS_SERVER_CONSTANTS.CASHFREE.CASHFREE_CLIENT_SECRET,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				order_amount: this.lockingRequest.basePrice,
				order_currency: 'INR',
				customer_details: {
					customer_id: this.lockingRequest.userId,
					customer_name: this.lockingRequest.customer.customer_name,
					customer_email: this.lockingRequest.customer.customer_email,
					customer_phone: this.lockingRequest.customer.customer_phone,
				},
				order_splits: [
					{
						vendor_id: this.lockingRequest.vendor_id,
						percentage: 70,
					},
				],
			}),
		};

		return fetch('https://sandbox.cashfree.com/pg/orders', options)
			.then((response) => response.json())
			.then((response: Order) => {
				return response;
			})
			.catch((error) => {
				throw new Error(`Cashfree order creation failed: ${error}`);
			});
	}

	private async updateLock() {
		if (!this.existingBooking) return;

		const isAvailable = await this.isListingAvailable();

		if (!isAvailable) {
			console.log('Listing is not available for update.');
			return null;
		}

		try {
			return await BookingModel.findOneAndUpdate(
				{ id: this.existingBooking.id },
				{
					...this.lockingRequest,
					lockedAt: toUnixTimestamp(new Date()),
				},
				{
					new: true,
				},
			);
		} catch (error) {
			return `Error updating booking for id: ${this.existingBooking.id}. Error: ${error}`;
		}
	}

	async book() {
		await this.checkExistingBooking();

		if (!this.existingBooking) {
			try {
				const createdLock = await this.createLock();
				const order: Order = await this.createOrder();
				return {
					success: true,
					message: 'Lock Created Successfully',
					booking: createdLock,
					order,
				};
			} catch (error) {
				return { success: false, message: `Error creating Lock: ${error}` };
			}
		}

		const isOpen = await this.isListingAvailable();

		if (!isOpen) {
			return { success: false, message: 'Listing is not available currently' };
		}

		try {
			const updatedLock = await this.updateLock();
			if (updatedLock) {
				/**
				 * Create the Order on cashfree
				 */
				const order: Order = await this.createOrder();
				return {
					success: true,
					message: 'Lock updated successfully',
					booking: updatedLock,
					order,
				};
			} else {
				return {
					success: false,
					message: 'Listing is not available currently',
				};
			}
		} catch (error) {
			return { success: false, message: `Error updating booking: ${error}` };
		}
	}
}
