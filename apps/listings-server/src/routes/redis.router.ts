import express from "express";
import { deleteKeyValue, getKeyValue, setKeyValue } from "../controllers/redis.controller";

const router = express.Router();

router.post("/set", setKeyValue);

router.get("/get/:key", getKeyValue);

router.delete("/del/:key", deleteKeyValue);

export default router;
