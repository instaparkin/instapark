import { kafka } from "./client";

interface ProduceMessageProps {
    topic: string
    key: string
    data: Record<string, unknown> | string
    partition: number
}

export async function produceMessage({ topic, key, data, partition }: ProduceMessageProps) {

    const producer = kafka.producer();

    await producer.connect();

    await producer.send({
        topic: topic,
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