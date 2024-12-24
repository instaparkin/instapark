import Redis from "ioredis";

export class RedisServer {
    private _redis: Redis;

    constructor() {
        this._redis = new Redis();
    }

    get redis() {
        return this._redis;
    }

    async shutdown() {
        try {
            await this._redis.quit();
            console.log("Redis connection closed.");
        } catch (error) {
            console.error("Error shutting down Redis:", error);
        }
    }
}
