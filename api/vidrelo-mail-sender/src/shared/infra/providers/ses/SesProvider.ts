import { SES } from '@aws-sdk/client-ses';
import { Mail } from '@modules/mail/domain/Mail';

import { IMailProviderInterface } from '../IMailProviderInterface';

export class SesProvider implements IMailProviderInterface {
  async send(mail: Mail): Promise<void> {
    const client = new SES({ region: process.env.AWS_REGION });

    try {
      await client.sendEmail({
        Source: process.env.AWS_SES_DEFAULT_MAIL,
        Destination: {
          ToAddresses: [mail.to],
        },
        Message: {
          Subject: {
            Data: mail.subject,
          },
          Body: {
            Html: {
              Data: mail.html,
              Charset: 'UTF-8',
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
