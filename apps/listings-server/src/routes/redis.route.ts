import { Router } from "@instapark/utils";
import { deleteKeyValue, getKeyValue, setKeyValue } from "../controllers/redis.controller";
import { API_ENDPOINTS } from "@instapark/constants";

const router = Router();

router.post(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.REDIS.SET,
    setKeyValue);

router.get(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.REDIS.GET,
    getKeyValue);

router.delete(
    API_ENDPOINTS.LISTINGS_SERVER.ROUTES.REDIS.DEL,
    deleteKeyValue);

export default router;
