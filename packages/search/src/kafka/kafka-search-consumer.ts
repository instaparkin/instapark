import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'listings-add-client',
    brokers: ['kafka:9092']
})

async function initConsumer() {
    const consumer = kafka.consumer({
        groupId: 'listings-add-group'
    });
    await consumer.connect();

    await consumer.subscribe({
        topic: 'listings-add-topic',
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(topic, partition, message);
        }
    })
}

initConsumer();