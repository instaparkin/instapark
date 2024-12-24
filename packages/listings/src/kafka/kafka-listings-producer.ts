"use server"

import { Kafka, Producer } from "kafkajs";

interface IProduceMessage {
    listingData: Record<string,unknown>
}

let kafkaProducer: Producer | null = null

export async function initProducer() {
    if (kafkaProducer) {
        return kafkaProducer;
    }

    const kafka = new Kafka({
        clientId: 'listings-add-client',
        brokers: ['localhost:9092']
    })

    const producer = kafka.producer({
        allowAutoTopicCreation: false,
        transactionTimeout: 30000
    });

    await producer.connect();

    kafkaProducer = producer;

    return kafkaProducer;

}

export async function addListingToKafka({ listingData }: IProduceMessage) {
    try {
        const producer = await initProducer();
        await producer.send({
            topic: "listings-add-topic",
            messages: [{
                key : "POST",
                value : JSON.stringify({data: listingData, type: "POST"}),
                partition: 0
            }],
        });

        console.log("Message produced successfully");
    } catch (error) {
        console.error("Error producing message:", error);
        throw error;
    }
}

