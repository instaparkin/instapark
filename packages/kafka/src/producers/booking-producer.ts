import { Booking, Listing, Payment, ProducerType } from "@instapark/types";
import { KAFKA_CONSTANTS } from "../constants/kafka-constants";
import { kafka } from "../kafka/kafka";

export async function bookingProducer({ type, data, partition }: ProducerType<Payment | string>) {

    const producer = kafka.producer();

    await producer.connect();

    /**
     * TODO:
     * Partition assigning logic
     */
    const ack = await producer.send({
        acks: -1,
        topic: KAFKA_CONSTANTS.BOOKING_TOPIC,
        messages: [
            {
                value: JSON.stringify({ type, data }),
                partition: partition,
            }
        ]
    })

    ack.map(e => {
        console.log(e);
    })
    await producer.disconnect();
}