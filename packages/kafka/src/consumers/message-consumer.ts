import kafkaConfig from "../../kafka-config.json";
import { kafka } from "../kafka/kafka";
import { Server } from "socket.io";
import { Message } from "@instapark/types";
import { axios, GLOBAL_CONFIG } from "@instapark/utils";
import { logger } from "@instapark/utils";

interface MessageConsumerProps {
    io: Server;
    fromBeginning?: boolean;
}

/**
 * Function used in both message read and unread event
 * @param payload 
 */
const createMessage = async (payload: Message) => {
    try {
        const response = await axios.post("http://localhost:8084/messages/create", payload);
        logger.info("Message persisted:", response.data);
    } catch (error) {
        logger.error("Error persisting message:", error);
    }
};

/**
 * Kafka Consumer to process chat messages.
 * For each message it checks if the users has any other tabs/sockets opened then it will emit the message to all the sockets.
 * First the message is created in the database.
 * @param param0 
 */
export const messageConsumer = async ({ fromBeginning = false, io }: MessageConsumerProps) => {
    const consumer = kafka.consumer({ groupId: kafkaConfig.MESSAGE_CONSUMER_GROUP });

    await consumer.connect();

    await consumer.subscribe({ topic: /^chat-.*/, fromBeginning });

    await consumer.run({
        eachMessage: async ({ message }) => {

            const messageValue = message.value?.toString() as string;

            const payload = JSON.parse(JSON.parse(messageValue).data) as Message;

            logger.info("Kafka Payload", payload);

            const receiverSockets = await io.in(payload.receiverId).fetchSockets();

            if (receiverSockets) {
                payload.status = "Delivered";
                await createMessage(payload)
                    .then(() => {
                        io.to(payload.receiverId).emit(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, payload);
                    });
            } else {
                payload.status = "Sent"
                createMessage(payload);
            }
        }
    })
}
