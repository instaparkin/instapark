import { kafka } from "../kafka/kafka";
import { axios, logger } from "@instapark/utils";
import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { ConsumerType, Booking } from "@instapark/types"

interface BookingConsumerProps {
    fromBeginning?: boolean;
}

export async function bookingConsumer({ fromBeginning = false }: BookingConsumerProps) {
    const consumer = kafka.consumer({
        groupId: KAFKA_CONSTANTS.BOOKING_CONSUMER_GROUP,
        retry: {
            retries: 5
        }
    });

    try {
        await consumer.connect();
        await consumer.subscribe({
            topics: [KAFKA_CONSTANTS.BOOKING_TOPIC],
            fromBeginning,
        });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const messageValue: ConsumerType<Booking> = JSON.parse(message.value?.toString() || '{}');

                    logger.info("Form Data:", messageValue.data);

                    try {
                        if (messageValue.type === "POST") {
                            axios.post("http://localhost:8080/search/typesense/booking/",
                                messageValue.data
                            )
                        }
                        else if (messageValue.type === "PUT") {
                            axios.put("http://localhost:8080/search/typesense/booking/",
                                messageValue.data
                            )
                        } else if (messageValue.type === "DELETE") {
                            axios.delete(`http://localhost:8080/search/typesense/booking/${messageValue.data}`,
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
