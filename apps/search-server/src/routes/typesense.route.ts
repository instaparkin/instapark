import { Router } from "@instapark/utils";
import { deleteListing, createListing, updateListing } from "../controllers/typesense.controller";

const router = Router();

router.post("/listing", createListing)

router.put("/listing/", updateListing)

router.delete("/listing/:id", deleteListing)

export default router