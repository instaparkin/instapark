import { Router } from "@instapark/utils";
import { handleQuery } from "../controllers/search.controller";

const router = Router();

router.get("/:collection", handleQuery);

export default router;
