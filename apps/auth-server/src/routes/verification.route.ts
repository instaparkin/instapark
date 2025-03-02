import { Router } from 'express';
import { verifyUser } from '../controllers/verification.controller';

const VerificationRouter = Router();

VerificationRouter.get('/', verifyUser);

export { VerificationRouter };
