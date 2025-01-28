import { io } from "socket.io-client";

const CHAT_SERVER_URL = "http://localhost:808"

export const useSocket = () => {

    const socket = io()

    return () => {

    }
}