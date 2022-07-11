import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/error/AppError';
import { User } from '../../../user/domain/User';
import { Auth } from '../../domain/Auth';
import { IUserToAuthDTO, IAuthenticatedDTO } from '../../dtos/AuthDTO';
import { IAuthRepository } from '../../repositories/IAuthRepository';

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('authRepository')
    private authRepository: IAuthRepository,
    @inject('user')
    private user: User,
    @inject('auth')
    private auth: Auth,
  ) {}

  async authenticate(data: IUserToAuthDTO): Promise<IAuthenticatedDTO> {
    Object.assign(this.user, { name: data.username, ...data });

    await this.authRepository.findByUsername(this.user);
    this.checkPassword(data.password);
    this.user.auth = this.auth;

    return this.verifyToken();
  }

  private checkPassword(inputPassword: string): void {
    if (!compareSync(inputPassword, this.user.password)) {
      throw new AppError(
        `1Your username or password was wrong. Please try again`,
      );
    }
  }

  private async findTokenByUserId(): Promise<boolean> {
    return this.authRepository.findTokenByUserId(this.user);
  }

  private generateToken(): void {
    const secret = process.env.SECRET_KEY;
    const token = sign({}, secret, {
      subject: String(this.user.id),
      jwtid: String(process.env.COMPANY_ID),
    });

    this.user.auth = {
      id: uuid(),
      access_token: token,
      expires_in: '24',
      created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      user_id: this.user.id,
    };
  }

  public async verifyToken(): Promise<IAuthenticatedDTO> {
    const exists = await this.findTokenByUserId();
    if (!exists || (exists && this.isExpired())) {
      this.generateToken();
      this.save();
    }

    return {
      userId: this.user.id,
      accessToken: this.user.auth.access_token,
      createdAt: moment(this.user.auth.created_at).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    };
  }

  private isExpired(): boolean {
    const today = moment(new Date(), 'YYYY-mm-dd').format(
      'YYYY-MM-DD HH:mm:ss',
    );

    const expires_in = moment(this.user.auth.created_at, 'YYYY-mm-dd').format(
      'YYYY-MM-DD HH:mm:ss',
    );

    const ms = moment(today).diff(expires_in);
    const duration = moment.duration(moment(today).diff(expires_in)).asHours();
    const validation = parseInt(
      `${Math.floor(duration)}${moment.utc(ms).format('mm')}`,
    );

    return validation >= 2400;
  }

  private async save(): Promise<void> {
    await this.authRepository.save(this.user);
  }
}
