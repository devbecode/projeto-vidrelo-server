import { hashSync } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { STATUS_USER, User } from '@modules/user/domain/User';
import { IChangePasswordDTO } from '@modules/user/dto/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import { SQS_OPERATIONS } from '@shared/infra/queue/SqsProvider';

@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject('user')
    private user: User,
    @inject('userRepository')
    private repository: IUserRepository,
  ) {}

  public async createPassword(data: IChangePasswordDTO): Promise<void> {
    this.user.id = data.user_id;
    this.user.email = data.user_email;
    this.user.password = data.newPassword;

    await this.checkIfExists();
    this.checkPasswordStrength(data.newPassword);
    this.checkIsAbleToChangePassword();

    Object.assign(this.user, {
      status: STATUS_USER.ACTIVE,
      first_password: !!data.user_email,
    });

    const newPassword = this.hashPassword(data.newPassword);
    this.user.password = newPassword;

    try {
      await this.repository.changePasswordById(this.user);
      await this.authMessage(newPassword);
    } catch (error) {
      console.log(error);
    }
  }

  private async authMessage(password: string): Promise<void> {
    const authMessage = {
      id: this.user.id,
      password,
      operation: SQS_OPERATIONS.CHANGE_PASSWORD,
    };

    const sqsOrderData = {
      MessageAttributes: {
        id: {
          DataType: 'String',
          StringValue: authMessage.id,
        },
        password: {
          DataType: 'String',
          StringValue: authMessage.password,
        },
        operation: {
          DataType: 'String',
          StringValue: authMessage.operation,
        },
      },

      MessageBody: JSON.stringify(authMessage),
      MessageDeduplicationId: this.user.email,
      MessageGroupId: 'userAuth',
      QueueUrl: process.env.AWS_QUEUE_USER_URL,
    };
  }

  public checkIsAbleToChangePassword(): void {
    if (!this.user.first_password) {
      throw new AppError(`No has possible change password`, 500);
    }
  }

  public async checkIfExists(): Promise<void> {
    if (!this.user.id && !(await this.repository.findByEmail(this.user))) {
      throw new AppError(`User not found to email ${this.user.email}`, 400);
    }

    if (!(await this.repository.findById(this.user))) {
      throw new AppError(`User not found to id ${this.user.id}`, 400);
    }
  }

  public hashPassword(password: string): string {
    return hashSync(password, 12);
  }

  public checkPasswordStrength(password: string): void {
    if (password.length < 8) {
      throw new AppError(`The password cannot be less than 8 characters`, 400);
    }
  }
}
