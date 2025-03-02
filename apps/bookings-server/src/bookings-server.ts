import 'dotenv/config';
import { config } from 'dotenv';
import {
	errorHandler,
	middleware,
	supertokens,
	ensureSuperTokensInit,
} from '@instapark/auth';
import mongoose from 'mongoose';
import { BOOKINGS_SERVER_CONSTANTS } from './constants/bookings-server-constants';
import { BookingRouter } from './routes/booking.route';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { VendorRouter } from './routes/vendor.route';
import { SettlementRouter } from './routes/settlements.route';
import { PaymentRouter } from './routes/payment.route';
import { rateLimiter } from '@instapark/utils';

config({ path: path.resolve(__dirname, '../', '.env.local') });

async function connectDB() {
	try {
		await mongoose.connect(BOOKINGS_SERVER_CONSTANTS.MONGODB.URI);
		console.log('✅ MongoDB Connected');
	} catch (error) {
		console.error('❌ MongoDB connection error:', error);
		process.exit(1);
	}
}

async function init() {
	ensureSuperTokensInit();

	const app = express();

	app.use(express.json());

	app.use(
		cors({
			origin: process.env.FRONTEND_URL,
			allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
			methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
			credentials: true,
		}),
	);

	app.use(middleware());

	app.use(rateLimiter);

	await connectDB();

	app.get('/', (req, res) => {
		res.send('🚀 Booking Server is up and running');
	});

	app.use('/bookings', BookingRouter);

	app.use('/settlements', SettlementRouter);

	app.use('/vendor', VendorRouter);

	app.use('/payments', PaymentRouter);

	app.use(errorHandler());

	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () => {
		console.log(`🚀 Server running at http://localhost:${PORT}`);
	});
}

init();
