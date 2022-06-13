import { Mail } from '@modules/mail/domain/Mail';

export enum PROVIDER_TYPES {
  GMAIL = 'gmail',
  SES = 'ses',
}

export interface IMailProviderInterface {
  send(mail: Mail): Promise<void>;
}
