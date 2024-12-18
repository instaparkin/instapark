"use server"

import { Kafka, Producer } from "kafkajs";

interface IProduceMessage {
    topic: string
    value: string
    partition: number
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

    const producer = kafka.producer();

    await producer.connect();

    kafkaProducer = producer;

    return kafkaProducer;

}

export async function addListingToKafka({ topic, value, partition }: IProduceMessage) {
    try {
        const producer = await initProducer();
        await producer.send({
            topic: topic,
            messages: [{
                value: value,
                partition: partition
            }]
        });
    } catch (error) {
        throw error;
    }
}
