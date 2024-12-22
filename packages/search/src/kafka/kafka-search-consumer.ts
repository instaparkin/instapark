"use server";

import { Consumer, Kafka } from "kafkajs";
import { addDocumentToTypesense } from "../typesense/add-documents";
import config from "../typesense/config.json";

let kafkaConsumer: Consumer | null = null;

async function initConsumer() {
    if (kafkaConsumer) return kafkaConsumer;

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
            fromBeginning: false,
        });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const messageValue = JSON.parse(message.value?.toString() || "{}");

                    if (messageValue.type === "POST") {
                        console.log("Processing message:", messageValue.data);

                        await addDocumentToTypesense({
                            collection: config.schemas.LISTING_SCHEMA_NAME,
                            data: messageValue.data,
                        });

                        console.log("Document added successfully");
                    } else {
                        console.warn("Unhandled message type:", messageValue.type);
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error("Error consuming messages:", error);
        throw error;
    }
}
