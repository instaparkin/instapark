import { produceMessage } from "@instapark/kafka"
import { addListingToDB } from "@instapark/listings";

export const listingsAddForm = async (req, res) => {
    try {
        const listingData = req.body

        console.log(listingData);

        produceMessage({
            topic: "listings-add-topic",
            key: "form-data",
            data: listingData,
            partition: 0
        })

        await addListingToDB(listingData).then(() => {
            console.log("Added to listings DB");
        }).catch((error) => {
            console.log("Failed to add to listings Db" + error);
        });

        res.status(200).send("Listing added successfully");
    } catch (error) {
        console.error("Error in /add route:", error);
        res.status(500).json({ error: "Failed to add listing", details: error.message });
    }
};
