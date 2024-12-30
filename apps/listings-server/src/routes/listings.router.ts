import express from "express";
import { getListing, listingsAddForm } from "../controllers/listings.controller";

const router = express.Router();

router.post("/add", listingsAddForm);

router.get("/get/:listingId", getListing)

export default router;
