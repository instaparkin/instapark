import { Listing, ProducerType } from "@instapark/types";
import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { kafka } from "../kafka/kafka";

export async function searchProducer({ type, data, partition }: ProducerType<Listing | string>) {

    const producer = kafka.producer();

    await producer.connect();

    const ack = await producer.send({
        acks: -1,
        topic: KAFKA_CONSTANTS.SEARCH_TOPIC,
        messages: [
            {
                value: JSON.stringify({ type, data }),
                partition: partition,
            }
        ]
    })

    await producer.disconnect();

    return ack
}