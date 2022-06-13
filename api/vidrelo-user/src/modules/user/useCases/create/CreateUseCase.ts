import { hashSync } from 'bcrypt';
import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { STATUS_USER, User, USER_PROFILE } from '@modules/user/domain/User';
import { ICreateUserDTO } from '@modules/user/dto/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import { SqsProvider, SQS_OPERATIONS } from '@shared/infra/queue/SqsProvider';
import {
  checkAddress,
  checkEachStringLength,
  checkEmail,
  checkPassowrdStrength,
  checkProfile,
  checkTelephone,
  formatDate,
} from '@shared/utils';

@injectable()
export class CreateUseCase {
  constructor(
    @inject('userRepository')
    private repository: IUserRepository,
    @inject('user')
    private user: User,
  ) {}

  public async create(newUser: ICreateUserDTO): Promise<User> {
    this.user.email = newUser.email;
    await this.checkIfExists();

    Object.assign(this.user, {
      id: uuid(),
      name: newUser.name,
      profile: newUser.profile,
      salt: this.generateSalt(),
      email: newUser.email,
      password: newUser.password,
      telephone: newUser.telephone,
      first_password: true,
      status: STATUS_USER.ACTIVE,
      cep: newUser.cep,
      state: newUser.state,
      district: newUser.district,
      street: newUser.street,
      number: newUser.number,
      complement: newUser.complement,
      city: newUser.city,
      created_at: formatDate(new Date().toISOString()),
    });

    this.checkToCreate();
    this.encryptPassword();

    try {
      await this.repository.save(this.user);
      await this.sendMessageToQueue();
    } catch (e) {
      console.log(e);
    }
    return this.user;
  }

  private async messageToClientProfile(): Promise<void> {
    const dataMessage = {
      id: this.user.id,
      name: this.user.email,
      status: this.user.status,
      password: this.user.password,
      created_at: this.user.created_at,
    };

    const sqsOrderData = {
      MessageAttributes: {
        id: {
          DataType: 'String',
          StringValue: dataMessage.id,
        },
        status: {
          DataType: 'String',
          StringValue: dataMessage.status,
        },
        name: {
          DataType: 'String',
          StringValue: dataMessage.name,
        },
        password: {
          DataType: 'String',
          StringValue: dataMessage.password,
        },
        created_at: {
          DataType: 'String',
          StringValue: dataMessage.created_at,
        },
      },

      MessageBody: JSON.stringify(dataMessage),
      MessageDeduplicationId: dataMessage.id,
      MessageGroupId: 'userCreate',
      QueueUrl: process.env.AWS_QUEUE_USER_URL,
    };

    await SqsProvider.sendMessage(sqsOrderData);
  }

  private async authMessage(): Promise<void> {
    const authMessage = {
      id: this.user.id,
      name: this.user.email,
      status: this.user.status,
      password: this.user.password,
      created_at: this.user.created_at,
      operation: SQS_OPERATIONS.CREATE_USER,
    };

    const sqsOrderData = {
      MessageAttributes: {
        id: {
          DataType: 'String',
          StringValue: authMessage.id,
        },
        name: {
          DataType: 'String',
          StringValue: authMessage.name,
        },
        status: {
          DataType: 'String',
          StringValue: authMessage.status,
        },
        password: {
          DataType: 'String',
          StringValue: authMessage.password,
        },
        created_at: {
          DataType: 'String',
          StringValue: authMessage.created_at,
        },
        operation: {
          DataType: 'String',
          StringValue: authMessage.operation,
        },
      },

      MessageBody: JSON.stringify(authMessage),
      MessageDeduplicationId: this.user.id,
      MessageGroupId: 'userAuth',
      QueueUrl: process.env.AWS_QUEUE_USER_URL,
    };

    await SqsProvider.sendMessage(sqsOrderData);
  }

  private async messageToEmployeeProfile(): Promise<void> {
    const dataMessage = {
      subject: 'Alteracao de senha - VIDRELO',
      to: this.user.email,
      params: {
        user_id: this.user.id,
        user_salt: this.user.salt,
        user_name: this.user.name,
      },
      template_type: 'FirstPasswordTemplate',
    };

    const sqsOrderData = {
      MessageAttributes: {
        subject: {
          DataType: 'String',
          StringValue: dataMessage.subject,
        },
        to: {
          DataType: 'String',
          StringValue: dataMessage.to,
        },
        user_id: {
          DataType: 'String',
          StringValue: dataMessage.params.user_id,
        },
        user_salt: {
          DataType: 'String',
          StringValue: dataMessage.params.user_salt,
        },
        user_name: {
          DataType: 'String',
          StringValue: dataMessage.params.user_name,
        },
        template_type: {
          DataType: 'String',
          StringValue: dataMessage.template_type,
        },
      },

      MessageBody: JSON.stringify(dataMessage),
      MessageDeduplicationId: this.user.id,
      MessageGroupId: 'userMail',
      QueueUrl: process.env.AWS_QUEUE_SES_URL,
    };

    await SqsProvider.sendMessage(sqsOrderData);
  }

  private async sendMessageToQueue(): Promise<void> {
    if (!this.isClient()) {
      await this.messageToEmployeeProfile();
    }

    await this.authMessage();
  }

  private encryptPassword(): void {
    if (!this.user.password && this.isClient()) {
      throw new AppError(
        `The password can not be empty to client profile`,
        400,
      );
    } else if (!this.isClient()) {
      this.user.password = hashSync(uuid(), 12);
    }

    this.user.password = hashSync(this.user.password, 12);
  }

  private generateSalt(): string {
    return crypto.createHash('md5').update(this.user.email).digest('hex');
  }

  private async checkIfExists(): Promise<void> {
    if (await this.repository.findByEmail(this.user)) {
      throw new AppError(
        `The user with email ${this.user.email} already exists`,
        500,
      );
    }
  }

  private checkToCreate(): void {
    const address = {
      cep: this.user.cep,
      city: this.user.city,
      complement: this.user.complement,
      district: this.user.district,
      state: this.user.state,
      street: this.user.street,
      number: this.user.number,
    };

    const userProperties = [
      { '100': this.user.name, '50': this.user.password },
    ];

    if (this.isClient()) {
      // checkAddress(address);
      checkPassowrdStrength(this.user.password);
    }

    checkProfile(this.user.profile);
    checkEachStringLength(userProperties);
    checkTelephone(this.user.telephone);
    checkEmail(this.user.email);
  }

  private isClient(): boolean {
    return this.user.profile === USER_PROFILE.CLIENT;
  }
}
