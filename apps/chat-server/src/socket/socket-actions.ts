import { Socket } from "socket.io";
import { redis } from "../redis/redis-server";
import { GLOBAL_CONFIG } from "@instapark/utils";
import { Contact, Message } from "@instapark/types";
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
        socket.join(socket.decoded.sub);
        await redis.sadd(userId, socket.id);
        socket.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, true);
        const receiverRooms = await redis.smembers(userId);
        receiverRooms.forEach(async r => {
            const unreadMessages = await MessageModel.find({ receiverId: userId, status: { $ne: "Read" } });
            unreadMessages.forEach(m => {
                socket.to(r).emit("UNREAD", m);
            })
        })
        console.log(socket.id + "Client connected");
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
export const handleDisconnection = async (socket: Socket) => {
    try {
        await redis.srem(socket.decoded.sub, socket.id);
        if (await redis.scard(socket.decoded.sub) === 0) {
            socket.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, false);
        }
        socket.emit(GLOBAL_CONFIG.CHAT_SERVER.PSTATUS_EVENT, true);
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
 * This is typically triggered when a message has been seen by the recipient.
 * 
 * @param {Message[]} messages - An array of message objects to be updated to "Read".
 * @throws {Error} Logs any errors encountered while updating the message status.
 */
export const handleOnRead = async (messages: Message[], socket: Socket) => {
    try {
           await Promise.all(
            messages.map((message) =>
                MessageModel.updateMany(
                    { senderId: message.senderId, receiverId: message.receiverId },
                    { $set: { status: "Read" } }
                )
            )
        );

        const m = messages[0]
        const data =  await MessageModel.find({
            $or: [
              { senderId: m?.senderId, receiverId: m?.receiverId },
              { senderId: m?.senderId, receiverId: m?.receiverId }
            ]
          }).sort({ createdAt: 1 });

        const receiverRooms = await redis.smembers(m!.senderId);
        receiverRooms.forEach((room) => {
            socket.to(room).emit(GLOBAL_CONFIG.CHAT_SERVER.READ_EVENT, data);
        });
    } catch (error) {
        throw new Error(`Failed to update message status for senderId: ${messages[0]?.senderId}`);
    }
};

export const handleRefetchData = async () => {

}