export const SQS_OPERATION = {
  CHANGE_PASSWORD: 'changePassword',
  CREATE_USER: 'createUser',
};

export const SQS_PROVIDERS = {
  SQS: 'sqs',
};

export interface IQueueProvider {
  handleQueueConnect(): any;
}
