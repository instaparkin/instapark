import { Request, Response } from "express";
import { Contact } from "../models/contacts.model";

export const createContact = async (req: Request, res: Response) => {
    try {
        const { userId, contactUserId } = req.body;

        if (!userId || !contactUserId) {
            res.status(400).json({ error: 'userId and contactUserId are required' });
            return;
        }

        if (userId === contactUserId) {
            res.status(400).json({ error: 'userId and contactUserId cannot be the same' });
            return;
        }

        const existingContact = await Contact.findOne({
            $or: [
                { userId, contactUserId },
                { userId: contactUserId, contactUserId: userId },
            ],
        });

        if (existingContact) {
            res.status(409).json({ error: 'Contact already exists' });
            return;
        }

        const newContact = await Contact.create({ userId, contactUserId });

        await Contact.create({ userId: contactUserId, contactUserId: userId });

        res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

export const getContactsFromUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        const contacts = await Contact.find({ userId });

        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};
