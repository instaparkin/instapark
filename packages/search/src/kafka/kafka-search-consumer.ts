"use server";

import { Consumer, Kafka } from "kafkajs";

let kafkaConsumer: Consumer | null = null;

async function initConsumer() {
    if (kafkaConsumer) {
        return kafkaConsumer;
    }

    const kafka = new Kafka({
        clientId: "listings-add-client",
        brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({
        groupId: "listings-add-group",
    });

    await consumer.connect();

    kafkaConsumer = consumer;
    return kafkaConsumer;
}

export async function consumeMessage() {
    try {
        const consumer = await initConsumer();

        await consumer.subscribe({
            topic: "listings-add-topic",
            fromBeginning: true,
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageValue = message.value?.toString() as string;
                console.log(JSON.parse(messageValue));
            },
        });
    } catch (error) {
        console.error("Error consuming messages:", error);
        throw error;
    }
}
