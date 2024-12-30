import { kafka } from "../kafka/kafka";
import kafkaConfig from "../../kafka-config.json";

interface ProduceMessageProps {
    senderId: string
    receiverID: string
    key: string
    data: Record<string, unknown> | string
    partition: number
}

export async function messageProducer({ key, data, partition, senderId, receiverID }: ProduceMessageProps) {

    const producer = kafka.producer();

    await producer.connect();

    await producer.send({
        topic: `chat-${senderId}-${receiverID}`,
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