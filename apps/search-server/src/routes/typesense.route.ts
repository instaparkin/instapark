import { Router } from "@instapark/utils";
import { deleteListing, createListing, updateListing } from "../controllers/typesense.controller";

const router = Router();

router.post("/listing/create", createListing)

router.put("/listing/update", updateListing)

router.delete("/listing/delete/:id", deleteListing)

export default router