import { Router } from "@instapark/utils";
import { deleteUserAddress, getUserAddress, upsertUserAddress } from "../controllers/userAddress.controller";

const router = Router();

router.post("/upsert", upsertUserAddress);

router.get("/get/:userId", getUserAddress);

router.delete("/delete/:userId", deleteUserAddress)

export default router;