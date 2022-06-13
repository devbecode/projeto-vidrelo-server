import { SQS } from 'aws-sdk';
import { Consumer } from 'sqs-consumer';

import { UseCase } from '../useCases/UseCase';
import { UseCaseFactory } from '../useCases/UseCaseFactory';
import { IQueueProvider } from './IQueueProvider';

export class SqsQueueProvider implements IQueueProvider {
  private sqs: SQS = new SQS({
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
    region: process.env.AWS_REGION,
  });

  private async makeUseCase(params: any): Promise<UseCase> {
    return new UseCaseFactory(params).makeByOperation();
  }

  public handleQueueConnect(): SqsQueueProvider {
    const queue = this.openConnect();

    queue.on('error', err => {
      console.error(err.message);
    });

    queue.on('processing_error', err => {
      console.error(err.message);
    });

    queue.start();

    return this;
  }

  private openConnect(): Consumer {
    const { sqs } = this;
    return Consumer.create({
      queueUrl:
        'https://sqs.us-east-1.amazonaws.com/879080014846/vivix-user-dev.fifo',
      handleMessage: async message => {
        try {
          console.log(message);
          const params = JSON.parse(message.Body);

          const useCase = await this.makeUseCase(params);
          await useCase.handleQueue(params);
        } catch (error) {
          console.log(error);
        } finally {
          const deleteParams = {
            QueueUrl:
              'https://sqs.us-east-1.amazonaws.com/879080014846/vivix-user-dev.fifo',
            ReceiptHandle: message.ReceiptHandle,
          };

          this.sqs.deleteMessage(deleteParams, (err, data) => {
            if (err) {
              console.log(err, err.stack);
            } else {
              console.log('Successfully deleted message from queue');
            }
          });
        }
      },
      sqs,
    });
  }
}
