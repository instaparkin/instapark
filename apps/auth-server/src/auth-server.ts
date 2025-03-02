import 'dotenv/config';
import {
	errorHandler,
	middleware,
	supertokens,
	ensureSuperTokensInit,
} from '@instapark/auth';
import express from 'express';
import cors from 'cors';
import { AUTH_SERVER_CONSTANTS } from './constants/auth-server-constants';
import { rateLimiter } from '@instapark/utils';

export async function init() {
	ensureSuperTokensInit();

	const app = express();

	app.use(express.json());

	app.use(
		cors({
			origin: AUTH_SERVER_CONSTANTS.FRONTEND_URL,
			allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
			methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
			credentials: true,
		}),
	);

	app.use(middleware());

	app.use(rateLimiter);

	app.get('/', (req, res) => {
		res.send('Auth Server is up and running');
	});

	app.use(errorHandler());

	const port = process.env.PORT;

	app.listen(process.env.PORT, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
}
