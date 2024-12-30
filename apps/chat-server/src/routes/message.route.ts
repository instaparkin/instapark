import { Router } from "express";
import { createMessage, getMessages, getUnreadMessages } from "../controllers/messages.controller";

const router = Router();

router.post("/create", createMessage)

router.get("/get/:userId/:contactUserId", getMessages);

router.get("/get/unread/:userId", getUnreadMessages);

export default router