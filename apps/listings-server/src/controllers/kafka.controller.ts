import { searchProducer } from "@instapark/kafka";
import { logger, Request, Response } from "@instapark/utils";

export const kafkaSearchProducer = async (req: Request, res: Response) => {
    const listingData = req.body

    logger.info(listingData);

    await searchProducer({
        key: "form-data",
        data: listingData,
        partition: 0
    }).then(() => {
        res.status(200).send("Listing added successfully");
    })
        .catch((error) => {
            res.status(500).json({ error: "Failed to add listing", details: error });
        })
}