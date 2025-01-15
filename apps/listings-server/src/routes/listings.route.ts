import { Router } from "@instapark/utils";
import { deleteListing, getListing, upsertListing } from "../controllers/listings.controller";
import { API_ENDPOINTS } from "@instapark/constants";

const router = Router();

router.post(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.UPSERT,
    upsertListing);

router.get(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.GET,
    getListing);

router.delete(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.DELETE,
    deleteListing);

export default router;
