import { Request, Response } from "@instapark/utils";
import { RedisServer } from "../redis/redis-server";

const redisServer = new RedisServer();

const redis = redisServer.redis;

export const setKeyValue = async (req: Request, res: Response) => {
    const { key, value } = req.body;
    if (!key || !value) {
        res.status(400).send("Key and Value are required.");
        return;
    }
    try {
        const formattedValue = typeof value === "string" ? value : JSON.stringify(value);
        await redis.set(key, formattedValue);
        res.status(200).send("Success");
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getKeyValue = async (req: Request, res: Response) => {
    const { key } = req.params;
    if (!key) {
        res.status(400).send("Key is required.");
        return;
    }
    try {
        const value = await redis.get(key);
        if (value) {
            res.status(200).json({ key, value });
        } else {
            res.status(404).send("Key not found.");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteKeyValue = async (req: Request, res: Response) => {
    const { key } = req.params;
    if (!key) {
        res.status(400).send("Key is required.");
        return;
    }
    try {
        const result = await redis.del(key);
        if (result === 1) {
            res.status(200).send("Key deleted successfully.");
        } else {
            res.status(404).send("Key not found.");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
