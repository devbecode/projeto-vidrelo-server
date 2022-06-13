import { Router } from 'express';

import { mailRouter } from '@modules/mail/infra/http/mail.route';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use(mailRouter);

export { router };
