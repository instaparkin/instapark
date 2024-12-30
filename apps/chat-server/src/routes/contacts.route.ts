import express from 'express';
import { createContact, getContactsFromUserId } from '../controllers/contacts.controller';

const router = express.Router();

router.post('/create', createContact);

router.get('/get/:userId', getContactsFromUserId);

export default router;
