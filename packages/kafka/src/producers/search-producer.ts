import { SearchProducerType } from "@instapark/types";
import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { kafka } from "../kafka/kafka";

export async function searchProducer({ type, data, partition }: SearchProducerType) {

    const producer = kafka.producer();

    await producer.connect();

    await producer.send({
        topic: KAFKA_CONSTANTS.SEARCH_TOPIC,
        messages: [
            {
                value: JSON.stringify({ type, data }),
                partition: partition,
            }
        ]
    })

    await producer.disconnect();
}