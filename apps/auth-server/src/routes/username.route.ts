import { Router } from "@instapark/utils";
import { getUsername, upsertUsername } from "../controllers/username.controller";

const router = Router();

router.post("/upsert", upsertUsername);

router.get("/get",getUsername)

export default router