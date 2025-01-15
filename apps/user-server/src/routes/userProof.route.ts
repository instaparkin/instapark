import { Router } from "@instapark/utils";
import { deleteUserProof, getUserProof, upsertUserProof } from "../controllers/userProof.controller";

const router = Router();

router.post("/upsert", upsertUserProof);

router.get("/get/:userId", getUserProof);

router.delete("/delete/:userId", deleteUserProof);

export default router;