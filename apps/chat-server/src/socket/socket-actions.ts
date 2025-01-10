import { Server, Socket } from "socket.io";
import { GLOBAL_CONFIG, logger } from "@instapark/utils";
import { Message } from "@instapark/types";
import { messageProducer } from "@instapark/kafka";
import { Message as MessageModel } from "../models/messages.model";
import { redis } from "../redis/redis-server";

/**
 * Handles a new socket connection event.
 * 
 * Upon successful authentication, the user's ID is retrieved from the decoded JWT token,
 * and the socket ID is associated with the user ID in Redis.
 * The user's connection status is updated to "online".
 * Fetch the unread messages for the user.
 * 
 * @param {Socket} socket - The socket object representing the current connection.
 * @throws {Error} Throws an error if the connection setup fails.
 */
export const handleConnection = async (socket: Socket) => {
    try {

        console.log("Client connected " + socket.id);

        const userId: string = socket.decoded.sub;
        socket.join(userId);
        /**
         * Whenver a user connects it is emitted so that status can be seen in real time.
         */
        socket.broadcast.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, {
            userId,
            status: "Online"
        });
        /**
         * Add the userId to redis set.
         * This is used to retriever online users whenever two users are chatting.
         */
        await redis.sadd("INSTAPARK_ONLINE_USERS", userId);

        //Fetch the unread messages upon connection.
        const unreadMessages = await MessageModel.find({ receiverId: userId, status: { $ne: "Read" } });
        const count = unreadMessages.length
    } catch (error) {
        throw new Error("Failed to create socket connection: " + error);
    }
}

/**
 * Handles socket disconnection events.
 * 
 * When a socket disconnects, its ID is removed from the associated user's Redis entry.
 * If no sockets remain for that user in Redis, their status is updated to "offline".
 * 
 * @param {Socket} socket - The socket object representing the disconnected client.
 */
export const handleDisconnection = async (socket: Socket, io: Server) => {
    try {
        const matchingSockets = await io.in(socket.decoded.sub).fetchSockets();
        const isDisconnected = matchingSockets.length === 0;
        if (isDisconnected) {
            socket.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, {
                userId: socket.decoded.sub,
                status: "Offline"
            });
        }
        socket.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, {
            userId: socket.decoded.sub,
            status: "Online"
        });
        logger.info(socket.id + "Client disconnected");
    } catch (error) {
        logger.error("Failed to handle socket disconnection:", error);
    }
}

/**
 * Produces a message to Kafka for further processing.
 * 
 * Once a message is received, it is serialized and sent to the Kafka topic "send-message"
 * with relevant metadata for the sender and receiver.
 * 
 * @param {Message} message - The message object containing the details of the message.
 * @throws {Error} Logs any errors during the Kafka production process.
 */
export const handleOnMessage = async (message: Message) => {
    await messageProducer({
        key: "send-message",
        data: JSON.stringify(message),
        partition: 0,
        senderId: message.senderId,
        receiverID: message.receiverId
    }).then(() => {
        console.log("Produced the message to kafka");
    }).catch((error) => {
        console.log("Failed to Produce message to kafka: ", error);
    })
}

/**
 * Handles the 'READ' event for received messages.
 * 
 * Updates the status of the given messages in the database to "Read".
 * Notifies the sender about the updated message status.
 * 
 * @param {Message[]} messages - An array of message objects to be updated to "Read".
 * @param {Socket} socket - The socket instance for communication.
 * @throws {Error} Logs any errors encountered while updating the message status.
 */
export const handleOnRead = async (messages: Message[], socket: Socket) => {

    try {
        if (messages.length > 0) {
            // Update the status of all provided messages in the database
            await Promise.all(
                messages.map((message) =>
                    MessageModel.updateMany(
                        { senderId: message.senderId, receiverId: message.receiverId }, // Update by unique message ID
                        { $set: { status: "Read" } }
                    )
                )
            );

            // Notify the sender that the messages have been read
            const firstMessage = messages[0]; // Assume messages are from the same sender
            if (!firstMessage) throw new Error("No messages provided for read event.");

            const updatedMessages = messages.map((m) => ({ ...m, status: "Read" }));
            socket.to(firstMessage.senderId).emit(
                GLOBAL_CONFIG.CHAT_SERVER.READ_EVENT,
                updatedMessages[updatedMessages.length -1]
            );
            console.log("Read event sent to the client");
        }
    } catch (error) {
        throw new Error("Failed to update message status." + error);
    }
};