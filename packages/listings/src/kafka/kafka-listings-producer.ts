import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'listings-add-client',
    brokers: ['kafka://localhost:9092']
})

export async function initProducer() {
    try {
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic: 'listings-add-topic',

            
            messages: [{
                value: 'hello world'
            }]
        })
        console.log("done");
        
        await producer.disconnect();
    } catch (error) {
        console.error(error);
    }
}

initProducer()