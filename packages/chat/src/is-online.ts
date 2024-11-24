import { Redis } from "ioredis"

export async function isOnline(userId: string) {
    const redis = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    });

    if (await redis.scard(userId) > 0) {
        return true;
    }
    else {
        return false
    }
}
