import { Router } from 'express';
import { getPayments } from '../controllers/payment.controller';

const PaymentRouter = Router();

PaymentRouter.get('/', getPayments);

export default PaymentRouter;
