import { Router } from "@instapark/utils";
import { deleteListing, getListing, createListing, updateListing, getAllListings } from "../controllers/listings.controller";
import { API_ENDPOINTS } from "@instapark/constants";

const router = Router();

router.post(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.CREATE,
    createListing);

router.put(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.UPDATE,
    updateListing);

router.get(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.GET,
    getListing);

router.delete(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.LISTING.DELETE,
    deleteListing);

router.get("/listings/all", getAllListings)

export default router;
