import express from "express"
import { autoComplete, directions, geoCode, reverseGeoCode } from "../controllers/olamaps.controller";

const router = express.Router();

router.get("/autocomplete/:q", autoComplete);

router.get("/geocode/:q", geoCode);

router.get("/reverse-geocode/:latlng", reverseGeoCode);

router.get("/directions/:origin/:destination", directions)

export default router