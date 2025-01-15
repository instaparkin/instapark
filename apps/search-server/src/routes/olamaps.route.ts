import { Router } from "@instapark/utils";
import { autoComplete, directions, geoCode, reverseGeoCode } from "../controllers/olamaps.controller";
import { API_ENDPOINTS } from "@instapark/constants";

const router = Router();

router.get(
    API_ENDPOINTS.SEARCH_SERVER.ROUTES.OLAMAPS.AUTOCOMPLETE,
    autoComplete);

router.get(
    API_ENDPOINTS.SEARCH_SERVER.ROUTES.OLAMAPS.GEOCODE,
    geoCode);

router.get(
    API_ENDPOINTS.SEARCH_SERVER.ROUTES.OLAMAPS.REVERSE_GEOCODE,
    reverseGeoCode);

router.get(
    API_ENDPOINTS.SEARCH_SERVER.ROUTES.OLAMAPS.DIRECTIONS,
    directions)

export default router