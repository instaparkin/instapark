import { Router } from "express";
import { createLikedListing, deleteLikedListing, getLikedListings } from "../controllers/liked-listing.controller";

const LikedListingRouter = Router();

LikedListingRouter.post("/", createLikedListing);

LikedListingRouter.get("/", getLikedListings);

LikedListingRouter.delete("/", deleteLikedListing)

export { LikedListingRouter }