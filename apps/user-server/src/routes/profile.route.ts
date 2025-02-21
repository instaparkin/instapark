import { Router } from "express";
import { getProfile, upsertProfile } from "../controllers/profile.controller";

const ProfileRouter = Router();

ProfileRouter.post("/", upsertProfile);

ProfileRouter.get("/", getProfile)

export { ProfileRouter }