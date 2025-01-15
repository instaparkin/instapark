import { Router } from "@instapark/utils";
import { upsertUserName, getUserName, deleteUserName } from "../controllers/userName.controller";

const router = Router();

router.post("/upsert", upsertUserName);

router.get("/get/:userId", getUserName);

router.delete("/delete/:userId", deleteUserName);

export default router;