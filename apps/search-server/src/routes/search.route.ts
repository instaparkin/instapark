import express from "express";
import { handleQuery } from "../controllers/search.controller";

const router = express.Router();

router.post("/:query_by", handleQuery);

export default router;
