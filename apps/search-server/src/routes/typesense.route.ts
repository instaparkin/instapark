import { Router } from "@instapark/utils";
import { deleteListing, upsertListing } from "../controllers/typesense.controller";

const router = Router();

router.post("/listing/upsert", upsertListing)

router.delete("/listing/delete/:id", deleteListing)

export default router