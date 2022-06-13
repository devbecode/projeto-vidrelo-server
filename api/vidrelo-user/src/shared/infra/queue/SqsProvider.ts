import * as AWS from 'aws-sdk';

export enum SQS_OPERATIONS {
  CHANGE_PASSWORD = 'changePassword',
  CREATE_USER = 'createUser',
}

export class SqsProvider {
  private static sqs = new AWS.SQS({
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
    region: process.env.AWS_REGION,
  });

  public static async sendMessage(data: any): Promise<void> {
    await this.sqs.sendMessage(data).promise();
  }
}
