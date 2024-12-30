export interface Message {
    senderId: string
    receiverId: string
    content: string
    status: "Sent" | "Delivered" | "Read",
    createdAt?: Date,
    updatedAt?: Date
}

export interface Contact {
    _id: string
    userId: string;
    contactUserId: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
