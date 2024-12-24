import { RedisServer } from "../redis/redis-server";

const redisServer = new RedisServer();

const redis = redisServer.redis;

export const setKeyValue = async (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).send("Key and Value are required.");
    }
    try {
        const formattedValue = typeof value === "string" ? value : JSON.stringify(value);
        await redis.set(key, formattedValue);
        res.status(200).send("Success");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getKeyValue = async (req, res) => {
    const { key } = req.params;
    if (!key) {
        return res.status(400).send("Key is required.");
    }
    try {
        const value = await redis.get(key);
        if (value) {
            res.status(200).json({ key, value });
        } else {
            res.status(404).send("Key not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteKeyValue = async (req, res) => {
    const { key } = req.params;
    if (!key) {
        return res.status(400).send("Key is required.");
    }
    try {
        const result = await redis.del(key);
        if (result === 1) {
            res.status(200).send("Key deleted successfully.");
        } else {
            res.status(404).send("Key not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
