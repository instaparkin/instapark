import { Request, Response } from "express"
import { Message } from "../models/messages.model";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
    }
    const newMessage = Message.create(message);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { userId, contactUserId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactUserId },
        { senderId: contactUserId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const getUnreadMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send("UserId is required");
    }
    const unreadMessages = await Message.find({ receiverId: userId, status: { $ne: "Read" } }).sort({ createdAt: 1 });
    res.status(200).json(unreadMessages);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}