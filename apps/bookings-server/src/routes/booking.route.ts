import {
	book,
	completeBooking,
	CompleteBookingOrder,
	earningsStats,
	getBookings,
	getOtp,
	lock,
	verifyBooking,
} from '../controllers/booking.controller';
import { Router } from 'express';

const BookingRouter = Router();

BookingRouter.post('/complete', completeBooking);

BookingRouter.post('/complete/order', CompleteBookingOrder);

BookingRouter.post('/book', book);

BookingRouter.post('/lock', lock);

BookingRouter.get('/', getBookings);

BookingRouter.get('/otp', getOtp);

BookingRouter.post('/otp/verify', verifyBooking);

BookingRouter.get('/earnings-stats', earningsStats);

export { BookingRouter };
