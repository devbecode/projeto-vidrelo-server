import { GmailProvider } from './gmail/GmailProvider';
import {
  IMailProviderInterface,
  PROVIDER_TYPES,
} from './IMailProviderInterface';
import { SesProvider } from './ses/SesProvider';

export abstract class ProviderFactory {
  // eslint-disable-next-line consistent-return
  public static makeProvider(providerType: string): IMailProviderInterface {
    if (providerType === PROVIDER_TYPES.GMAIL) {
      return new GmailProvider();
    }

    if (providerType === PROVIDER_TYPES.SES) {
      return new SesProvider();
    }
  }
}
