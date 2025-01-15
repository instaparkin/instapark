import { Router } from "@instapark/utils";
import { handleQuery } from "../controllers/search.controller";

const router = Router();

router.post("/:query_by", handleQuery);

export default router;
