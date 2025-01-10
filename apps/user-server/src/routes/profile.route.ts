import { Router } from "express";
import { getFullname, upsertFullname } from "../controllers/profile.controller";

const router = Router();

router.post("/fullname/upsert", upsertFullname);

router.get("/fullname/get/:userId", getFullname)

export default router;