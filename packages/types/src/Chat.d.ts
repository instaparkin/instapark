export type Message = {
    id: string
    content: string
    senderId: string
    receiverId: string
    createdAt: string
    updatedAt: string
}
export type MessageRequest = Pick<Message, "content" | "senderId" | "receiverId">