import kafkaConfig from "../../kafka-config.json";
import { kafka } from "../kafka/kafka";
import { Redis } from "ioredis"
import { Server } from "socket.io";
import { Message } from "@instapark/types";

interface MessageConsumerProps {
    socket: Server
    fromBeginning?: boolean;
}

const redis = new Redis();

export const messageConsumer = async ({ fromBeginning = false, socket }: MessageConsumerProps) => {
    const consumer = kafka.consumer({ groupId: kafkaConfig.MESSAGE_CONSUMER_GROUP });

    try {
        await consumer.connect();

        await consumer.subscribe({ topic: /^chat-.*/, fromBeginning });
        /**
         * Emit the received message from the sender to all the connected sockets of the receiver
         */
        await consumer.run({
            eachMessage: async ({ message }) => {
                let payload: Message | null = null;
                try {
                    const messageValue = message.value?.toString();
                    if (messageValue) {
                        payload = await JSON.parse(JSON.parse(messageValue).data);
                        console.log("Kafka payload:", payload);
                    }
                } catch (error) {
                    console.error("Error parsing Kafka message payload:", error);
                    return;
                }
                try {
                    const connectedSockets = await redis.scard(payload!.receiverId);
                    if (connectedSockets > 0) {
                        const receiverRooms = await redis.smembers(payload!.receiverId);
                        receiverRooms.forEach((room) => {
                            console.log(room);
                            socket.to(room).emit("UNREAD", { ...payload, status: "Delivered" });
                        });
                        await fetch("http://localhost:8084/messages/create", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ ...payload, status: "Delivered" }),
                        });
                    } else {
                        console.log("User not online");

                        await fetch("http://localhost:8084/messages/create", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });
                    }
                } catch (error) {
                    console.error("Error processing Kafka message:", error);
                }
            },
        });
    } catch (error) {
        console.error("Kafka consumer error:", error);
    }
};
