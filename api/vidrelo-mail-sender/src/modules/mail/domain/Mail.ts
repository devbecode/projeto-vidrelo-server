import { IMailProviderInterface } from '../../../shared/infra/providers/IMailProviderInterface';

export class Mail {
  public subject: string;
  public to: string;
  public html?: string;
  public params: any;
  public template_type?: string;
  public providerType: string;
  public provider?: IMailProviderInterface;
}
