import express from "express";
import { addListingToDB, addListingToKafka } from "@instapark/listings";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        await addListingToKafka({
            topic: "listings-add-topic",
            value: JSON.stringify(req.body),
            partition: 0
        });
        const formData = JSON.parse(req.body);
        addListingToDB(formData);
        res.status(200).send("Listing added successfully");
    } catch (error) {
        res.status(500).json({ error: "Failed to add listing", details: error.message });
    }
});


export default router;