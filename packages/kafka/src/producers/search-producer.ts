import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { kafka } from "../kafka/kafka";

interface ProduceMessageProps {
    key: string
    data: Record<string, unknown> | string
    partition: number
}

export async function searchProducer({ key, data, partition }: ProduceMessageProps) {

    const producer = kafka.producer();

    await producer.connect();

    await producer.send({
        topic: KAFKA_CONSTANTS.SEARCH_TOPIC,
        messages: [
            {
                key: key,
                value: JSON.stringify({ data }),
                partition: partition
            }
        ]
    })

    await producer.disconnect();
}