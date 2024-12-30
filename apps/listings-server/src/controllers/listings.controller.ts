import { searchProducer } from "@instapark/kafka"
import { getListingFromDb } from "@instapark/listings";

export const listingsAddForm = async (req, res) => {
    try {
        const listingData = req.body

        console.log(listingData);

        await searchProducer({
            key: "form-data",
            data: listingData,
            partition: 0
        })

        res.status(200).send("Listing added successfully");
    } catch (error) {
        res.status(500).json({ error: "Failed to add listing", details: error.message });
    }
};

export const getListing = async (req, res) => {
    try {
        const { listingId } = req.params;
        const response = await getListingFromDb({ listingId });
        res.status(200).send(response)
    } catch (error) {
        res.status(500).json({ error: "Failed to Get listing", details: error.message });
    }
}