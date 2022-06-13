import { AppError } from '@shared/error/AppError';

import { IQueueProvider, SQS_PROVIDERS } from './IQueueProvider';
import { SqsQueueProvider } from './SqsQueueProvider';

export class QueueFactory {
  public makeByProvider(provider: string): IQueueProvider {
    switch (provider) {
      case SQS_PROVIDERS.SQS:
        return new SqsQueueProvider();
      default:
        throw new AppError(
          `No instance was found to provider ${provider}`,
          500,
        );
    }
  }
}
