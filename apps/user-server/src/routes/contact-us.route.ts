import { Router } from 'express';
import { contactUs } from '../controllers/contact-us.controller';

const ContactUsRouter = Router();

ContactUsRouter.post('/', contactUs);

export default ContactUsRouter;
