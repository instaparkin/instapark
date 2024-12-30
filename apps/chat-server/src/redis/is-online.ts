import { redis } from "./redis-server"

interface IsOnlineProps {
    userId: string
    socketId: string
}

export const isOnline = async ({ userId, socketId }: IsOnlineProps) => {
    return await redis.sismember(userId, socketId)
}