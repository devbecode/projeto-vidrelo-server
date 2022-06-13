import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Mail } from '@modules/mail/domain/Mail';
import { AppError } from '@shared/error/AppError';

import { SendUseCase } from './SendUseCase';

export class SendMailController {
  async send(request: Request, response: Response): Promise<Response> {
    const { subject, to, params } = request.body;
    const template_type: string = request.query.template as string;

    if (!template_type) {
      throw new AppError(`The field file template cannot be empty`);
    }

    const mail: Mail = {
      subject,
      to,
      params,
      template_type,
      providerType: process.env.MAIL_PROVIDER,
    };

    const sendUseCase = container.resolve(SendUseCase);

    await sendUseCase.send(mail);
    return response.send();
  }
}
