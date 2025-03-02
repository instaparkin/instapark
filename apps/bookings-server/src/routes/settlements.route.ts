import { Router } from 'express';
import { getSettlements } from '../controllers/settlements.controller';

const SettlementRouter = Router();

SettlementRouter.get('/', getSettlements);
export { SettlementRouter };
