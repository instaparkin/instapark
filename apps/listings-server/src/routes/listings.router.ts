import express from "express";
import { listingsAddForm } from "../controllers/listings.controller";

const router = express.Router();

router.post("/add", listingsAddForm);

export default router;
