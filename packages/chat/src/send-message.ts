import { Server } from "socket.io"

interface SendMessageProps {
    io: Server
    sender: string
    receiver: string
    message: string
}

export async function sendMessage({ io, sender, receiver, message }: SendMessageProps) {
    io.to(receiver).emit('message', { sender, message })
}