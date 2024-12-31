import { Server, Socket } from "socket.io";
import { GLOBAL_CONFIG } from "@instapark/utils";
import { Message } from "@instapark/types";
import { messageProducer } from "@instapark/kafka";
import { Message as MessageModel } from "../models/messages.model";

/**
 * Handles a new socket connection event.
 * 
 * Upon successful authentication, the user's ID is retrieved from the decoded JWT token,
 * and the socket ID is associated with the user ID in Redis.
 * The user's connection status is updated to "online".
 * 
 * @param {Socket} socket - The socket object representing the current connection.
 * @throws {Error} Throws an error if the connection setup fails.
 */
export const handleConnection = async (socket: Socket) => {
    try {
        const userId: string = socket.decoded.sub;
        socket.join(userId);
        socket.broadcast.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, {
            userId,
            status: true
        });
        const unreadMessages = await MessageModel.find({ receiverId: userId, status: { $ne: "Read" } });
        console.log(unreadMessages);

        unreadMessages.forEach(m => {
            socket.to(userId).emit(GLOBAL_CONFIG.CHAT_SERVER.UNREAD_EVENT, m);
        })
        console.log(socket.rooms);
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
                status: false
            });
        }
        socket.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, {
            userId: socket.decoded.sub,
            status: true
        });
        console.log(socket.id + "Client disconnected");
    } catch (error) {
        console.error("Failed to handle socket disconnection:", error);
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
            updatedMessages
        );

        console.log(`Updated ${messages.length} messages to "Read" for senderId: ${firstMessage.senderId}`);
    } catch (error) {
        console.error("Failed to update message status to 'Read':", error);
        throw new Error("Failed to update message status.");
    }
};

export const handleRefetchData = async () => {

}