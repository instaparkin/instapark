import { kafka } from "../kafka/kafka";
import { axios, logger } from "@instapark/utils";
import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { Listing } from "@instapark/types"

interface SearchConsumerProps {
    fromBeginning?: boolean;
}

export async function searchConsumer({ fromBeginning = false }: SearchConsumerProps) {
    const consumer = kafka.consumer({
        groupId: KAFKA_CONSTANTS.SEARCH_CONSUMER_GROUP,
    });

    try {
        await consumer.connect();
        await consumer.subscribe({
            topics: [KAFKA_CONSTANTS.SEARCH_TOPIC],
            fromBeginning,
        });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const formData: Listing = JSON.parse(message.value?.toString() || '{}').data;

                    logger.info("Form Data:", formData);

                    try {
                        await Promise.all([
                            axios.post("http://localhost:8080/listings/upsert", formData),
                            axios.post("http://localhost:8080/search/typesense/documents/add", {
                                collection: "listing_1",
                                data: formData
                            })
                        ]);
                    } catch (error) {
                        console.error("Error adding documents to Typesense:", error);
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error("Error connecting to Kafka or subscribing to topics:", error);
    }
}
