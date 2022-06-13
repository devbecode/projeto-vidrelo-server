import { Router } from 'express';

import { SendMailController } from '@modules/mail/useCases/sendMail/SendMailController';

const mailRouter = Router();
const sendMailController = new SendMailController();

mailRouter.post('/send', sendMailController.send);

export { mailRouter };
