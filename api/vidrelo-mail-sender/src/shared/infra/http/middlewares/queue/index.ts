import AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';

import { SqsProvider } from '@shared/infra/queue/SqsProvider';

const sqs = new AWS.SQS({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
  region: process.env.AWS_REGION,
});

const appQueue = Consumer.create({
  queueUrl:
    'https://sqs.us-east-1.amazonaws.com/879080014846/vivix-mail-sender-dev.fifo',
  handleMessage: async message => {
    try {
      await SqsProvider.getMessage(message);
    } catch (error) {
      console.log(error);
    } finally {
      const deleteParams = {
        QueueUrl:
          'https://sqs.us-east-1.amazonaws.com/879080014846/vivix-mail-sender-dev.fifo',
        ReceiptHandle: message.ReceiptHandle,
      };
      sqs.deleteMessage(deleteParams, (err, data) => {
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

export { appQueue };
