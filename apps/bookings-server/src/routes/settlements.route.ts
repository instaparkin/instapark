import { Router } from "express";
import { getSettlements } from "../controllers/settlements.controller";

const settlementRouter = Router();

settlementRouter.get(
    "/",
    getSettlements
)

export { settlementRouter };