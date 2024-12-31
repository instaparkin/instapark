import { Router } from "express";
import { upsertFullname } from "../controllers/profile.controller";

const router = Router();

router.post("/fullname/upsert", upsertFullname);

export default router;