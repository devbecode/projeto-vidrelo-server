import { hashSync } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { Mail } from '@modules/mail/domain/Mail';
import { AppError } from '@shared/error/AppError';
import { IMailProviderInterface } from '@shared/infra/providers/IMailProviderInterface';
import { ProviderFactory } from '@shared/infra/providers/ProviderFactory';
import { ITemplate, templateAsType } from '@shared/template/ITemplate';

@injectable()
export class SendUseCase {
  constructor(
    @inject('mail')
    private mail: Mail,
    @inject('fileTemplate')
    private templateMail: ITemplate,
  ) {}

  public async send(data: Mail): Promise<void> {
    if (data.template_type === 'PasswordRecoveryTemplate') {
      const paramsValues = Object.values(data.params);
      const paramIndex = Object.keys(data.params);
      const indexMail = paramIndex.indexOf('user_email');
      if (indexMail < 0) {
        throw new AppError(`Não existe nenhum campo com o email do usuário`);
      }
      const userMail = paramsValues[indexMail];
      // eslint-disable-next-line no-param-reassign
      data.params.encrypted_mail = hashSync(userMail as string, 12);
    }
    Object.assign(this.mail, data);

    this.mail.provider = this.makeProviderByType();
    this.checkParams();

    this.templateMail.setParams(data.params, data.template_type);
    this.mail.html = this.templateMail.render();

    await this.mountAndSend();
  }

  private makeProviderByType(): IMailProviderInterface {
    return ProviderFactory.makeProvider(this.mail.providerType);
  }

  private async mountAndSend(): Promise<void> {
    await this.mail.provider.send(this.mail);
  }

  private checkParams(): void {
    if (Object.keys(this.mail.params).length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (
        let i = 0;
        i < templateAsType[this.mail.template_type].length;
        i += 1
      ) {
        if (
          !Object.keys(this.mail.params).includes(
            templateAsType[this.mail.template_type][i],
          )
        ) {
          throw new AppError(
            `The params must have property ${
              templateAsType[this.mail.template_type][i]
            }, to type ${this.mail.template_type}`,
          );
        }
      }
    }
  }
}
