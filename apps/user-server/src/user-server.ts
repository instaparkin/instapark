import 'dotenv/config';
import {
	errorHandler,
	middleware,
	ensureSuperTokensInit,
} from '@instapark/auth';
import mongoose from 'mongoose';
import { USER_SERVER_CONSTANTS } from './constants/user-server-constants';
import ProfileRouter from './routes/profile.route';
import express from 'express';
import cors from 'cors';
import AadharRouter from './routes/aadhar.route';

/**
 * TODO:
 * 2. VerifySession()
 * 3. GraphQL Integration
 */
export async function connectDB() {
	try {
		await mongoose.connect(USER_SERVER_CONSTANTS.MONGODB.URI);
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
			origin: process.env.FRONTEND_URL,
			methods: ['GET', 'PUT', 'POST', 'DELETE'],
			credentials: true,
		}),
	);

	app.use(middleware());

	await connectDB();

	app.get('/', (req, res) => {
		res.send('User Server is Up and Running');
	});

	app.use('/profile', ProfileRouter);

	app.use('/aadhar', AadharRouter);

	app.use(errorHandler());

	app.listen(process.env.PORT, () => {
		console.log(`Server running on http://localhost:${process.env.PORT}`);
	});
}
