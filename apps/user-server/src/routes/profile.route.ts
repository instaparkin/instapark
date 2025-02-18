import { Router } from "express";
import { upsertProfile } from "../controllers/profile.controller";

const ProfileRouter = Router();

ProfileRouter.post("/", upsertProfile)

export {ProfileRouter}