export interface Message {
    senderId: string
    receiverId: string
    content: string
    status: "Sending" | "Sent" | "Delivered" | "Read",
    createdAt?: Date,
    updatedAt?: Date
}

export interface Contact {
    _id: string
    userId: string;
    contactUserId: string;
    lastMessaged: Date;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export type PstatusType = "Online" | "Offline" | Date