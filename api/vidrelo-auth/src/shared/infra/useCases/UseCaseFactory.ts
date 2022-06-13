import { container } from 'tsyringe';

import { ChangePassword } from '@modules/user/useCases/changePassword/ChangePassword';
import { CreateUseCase } from '@modules/user/useCases/create/CreateUseCase';
import { AppError } from '@shared/error/AppError';

import { SQS_OPERATION } from '../queue/IQueueProvider';
import { UseCase } from './UseCase';

export class UseCaseFactory {
  constructor(private message: any) {}

  // eslint-disable-next-line consistent-return
  public makeByOperation(): UseCase {
    const { operation } = this.message;

    switch (operation) {
      case SQS_OPERATION.CHANGE_PASSWORD:
        return container.resolve(ChangePassword);
      case SQS_OPERATION.CREATE_USER:
        return container.resolve(CreateUseCase);
      default:
        throw new AppError(
          `No instance was found to operation ${operation}`,
          500,
        );
    }
  }
}
