import { Router } from "@instapark/utils";
import { addPhoneNumber, deletePhoneNumber, getPhoneNumbers } from "../controllers/userPhoneNumber.controller";

const router = Router();

router.post("/upsert", addPhoneNumber);

router.get("/get/:userId", getPhoneNumbers);

router.delete("/delete", deletePhoneNumber);

export default router;
