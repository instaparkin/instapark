import express from "express";
import { addListingToDB } from "@instapark/listings";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        /**
         * First take the request and add the form data to listings database
         */
        await addListingToDB(req.body);
        res.send("Listing added successfully");

        /**
         * Sending Data to kafka to be consumed by search service
         */
    } catch (error) {
        res.send(error);
    }
})

export default router;