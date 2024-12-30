import { Kafka } from "kafkajs"

export const kafka = new Kafka({
    clientId: 'instapark',
    brokers: ["localhost:9092"]
}) 