import { Server } from "socket.io"

interface ReceiveMessageProps {
    io: Server
}

export async function receiveMessage({ io }: ReceiveMessageProps) {
    io.on("connection", (socket) => {
        socket.on('message', (data) => {
            console.log(data)
        })
     })
}