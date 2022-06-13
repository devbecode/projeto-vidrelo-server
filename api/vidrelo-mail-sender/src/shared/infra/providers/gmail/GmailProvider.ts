import mailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import 'dotenv/config';

import { Mail } from '@modules/mail/domain/Mail';

import { IMailProviderInterface } from '../IMailProviderInterface';

export class GmailProvider implements IMailProviderInterface {
  public async send(mail: Mail): Promise<void> {
    const smtpTransport = this.mountParams();
    return new Promise((resolve, reject) => {
      smtpTransport
        .sendMail(mail)
        .then(response => {
          smtpTransport.close();
          resolve();
          return response;
        })
        .catch(error => {
          smtpTransport.close();
          return reject(error);
        });
    });
  }

  public mountParams(): mailer.Transporter<SMTPTransport.SentMessageInfo> {
    const host: string = process.env.GMAIL_HOST;
    const port: number = process.env.GMAIL_PORT as unknown as number;

    const smtpTransport = mailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    return smtpTransport;
  }
}
