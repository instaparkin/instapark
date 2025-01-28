import mongoose from "mongoose";
import { Message } from "@instapark/types"

export const MessageSchema = new mongoose.Schema<Message>({
    id: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const MessageModel = mongoose.model("Message", MessageSchema);

export { MessageModel }