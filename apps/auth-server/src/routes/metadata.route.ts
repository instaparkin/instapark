import { Router } from "express";
import { deleteUserDetails, getUserDetails, upsertUserDetails } from "../controllers/metadata.controller";

const router = Router();

router.post("/create", upsertUserDetails)

router.get("/get", getUserDetails)

router.post("/delete",deleteUserDetails)

export default router