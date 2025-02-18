import { Router } from "@instapark/utils";
import { deleteListing, createListing, updateListing, getListings } from "../controllers/listings.controller";

const router = Router();

router.post(
    "/",
    createListing);

router.put(
    "/",
    updateListing);

router.delete(
    "/",
    deleteListing);

router.get(
    "/",
    getListings)

export default router;
