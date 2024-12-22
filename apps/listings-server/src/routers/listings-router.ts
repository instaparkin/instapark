import express from "express";
import { addListingToDB, addListingToKafka } from "@instapark/listings";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const listingData = {
            id: uuidv4(),
            ...req.body,
        };

        await addListingToKafka({
            topic: "listings-add-topic",
            value: JSON.stringify({ data: listingData, type: "POST" }),
            partition: 0
            
        });

        await addListingToDB(listingData);

        res.status(200).send("Listing added successfully");
    } catch (error) {
        console.error("Error in /add route:", error);
        res.status(500).json({ error: "Failed to add listing", details: error.message });
    }
});

export default router;
