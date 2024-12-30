import Redis from "ioredis";

export const redis = new Redis();

export async function shutdown() {
    try {
        await this._redis.quit();
        console.log("Redis connection closed.");
    } catch (error) {
        console.error("Error shutting down Redis:", error);
    }
}
