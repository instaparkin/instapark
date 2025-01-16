import { kafka } from "../kafka/kafka";
import { axios, logger } from "@instapark/utils";
import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { Listing, SearchConsumerType } from "@instapark/types"


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
                    const messageValue: SearchConsumerType = JSON.parse(message.value?.toString() || '{}');

                    logger.info("Form Data:", messageValue.data);

                    try {
                        if (messageValue.type === "POST") {
                            axios.post("http://localhost:8080/search/typesense/listing/create",
                                messageValue.data
                            )
                        }
                        else if (messageValue.type === "PUT") {
                            axios.put("http://localhost:8080/search/typesense/listing/update",
                                messageValue.data
                            )
                        } else if (messageValue.type === "DELETE") {
                            axios.delete(`http://localhost:8080/search/typesense/listing/delete/${messageValue.data}`,
                            )
                        }
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
