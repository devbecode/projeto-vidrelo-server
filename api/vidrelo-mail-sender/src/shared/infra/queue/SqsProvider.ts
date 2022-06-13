import { container } from 'tsyringe';

import { SendUseCase } from '@modules/mail/useCases/sendMail/SendUseCase';

export class SqsProvider {
  public static async getMessage(data: any): Promise<any> {
    const params = JSON.parse(data.Body);

    const provider = process.env.MAIL_PROVIDER;
    const sendMailUseCase = container.resolve(SendUseCase);
    await sendMailUseCase.send({ providerType: provider, ...params });
  }
}
