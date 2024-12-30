import { Model, model, models, Schema } from "mongoose";

interface IMessage {
    senderId: string
    receiverId: string
    status: "Sent" | "Delivered" | "Seen"
    content: string
    createdAt: Date
    updatedAt: Date
    version: number
}

export const messagesSchema = new Schema<IMessage>({
    senderId: {
        type: "String",
        required: true
    },
    receiverId: {
        type: "String",
        required: true
    },
    content: {
        type: "String",
        required: true
    },
    status: {
        type: "String",
        required: true,
        default: "Sent"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

export const Message: Model<IMessage> = models.Message || model("Messages", messagesSchema)