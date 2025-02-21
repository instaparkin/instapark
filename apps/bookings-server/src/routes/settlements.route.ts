import { Router } from "express";
import { createSettlement, getOnDemanBalance, getSettlements } from "../controllers/settlements.controller";

const settlementRouter = Router();

settlementRouter.get(
    "/",
    getSettlements
)

settlementRouter.get("/balance",
    getOnDemanBalance
)

settlementRouter.post("/",createSettlement)

export { settlementRouter };