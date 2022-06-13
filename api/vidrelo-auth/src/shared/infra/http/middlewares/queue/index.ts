import { QueueFactory } from '@shared/infra/queue/QueueFactory';

const provider = 'sqs';
console.log(provider);

const queueService = () => {
  return new QueueFactory().makeByProvider(provider).handleQueueConnect();
};

export { queueService };
