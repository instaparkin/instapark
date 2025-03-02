import 'dotenv/config';
import {
	errorHandler,
	middleware,
	supertokens,
	ensureSuperTokensInit,
} from '@instapark/auth';
import ListingsRouter from './routes/listings.route';
import { uploadthingExpress } from './uploadthing/uploadthing-express';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { LISTINGS_SERVER_CONSTANTS } from './constants/listings-server-constants';
import { rateLimiter } from '@instapark/utils';

/**
 * TODO:
 * 2. VerifySession()
 * 3. GraphQL Integration
 */

export async function connectDB() {
	try {
		await mongoose.connect(LISTINGS_SERVER_CONSTANTS.MONGODB.URI);
		console.log('✅ MongoDB Connected');
	} catch (error) {
		console.error('❌ MongoDB connection error:', error);
		process.exit(1);
	}
}

export async function init() {
	ensureSuperTokensInit();

	const app = express();

	app.use(express.json());

	app.use(
		cors({
			origin: [process.env.FRONTEND_URL!],
			allowedHeaders: [
				'content-type',
				...supertokens.getAllCORSHeaders(),
				'x-uploadthing-package',
				'x-uploadthing-version',
			],
			methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
			credentials: true,
		}),
	);

	app.use(middleware());

	app.use(rateLimiter);

	await connectDB();

	app.get('/', (req, res) => {
		res.send('Listings server is up and Running');
	});

	app.use('/listings', ListingsRouter);

	app.use('/uploadthing', uploadthingExpress);

	app.use(errorHandler());

	app.listen(process.env.PORT, () => {
		console.log(`Server running on http://localhost:${process.env.PORT}`);
	});
}
