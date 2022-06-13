import { inject, injectable } from 'tsyringe';

import { User, USER_PROFILE } from '@modules/user/domain/User';
import { IUpdateUserDTO } from '@modules/user/dto/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import {
  checkAddress,
  checkEachStringLength,
  checkEmail,
  checkTelephone,
} from '@shared/utils';

@injectable()
export class UpdateUseCase {
  constructor(
    @inject('userRepository')
    private repository: IUserRepository,
    @inject('user')
    private user: User,
  ) {}

  public async updateById(data: IUpdateUserDTO): Promise<User> {
    this.user.id = data.id;
    this.user.profile = data.profile;

    await this.checkIfExistsByIdAndProfile();

    Object.assign(this.user, {
      name: data.name,
      password: data.password,
      telephone: data.telephone,
      profile: data.profile,
      cep: data.cep,
      state: data.state,
      district: data.district,
      street: data.street,
      number: data.number,
      complement: data.complement,
      city: data.city,
    });

    this.checkToUpdate();
    await this.repository.updateById(this.user);

    return this.user;
  }

  private async checkIfExistsByIdAndProfile(): Promise<void> {
    if (!(await this.loadByIdAndProfile())) {
      throw new AppError(
        `No user was found to id ${this.user.id} and profile ${this.user.profile}`,
      );
    }
  }

  private async loadByIdAndProfile(): Promise<boolean> {
    return this.repository.findByIdAndProfile(this.user);
  }

  private async loadById(): Promise<boolean> {
    return this.repository.findByIdAndProfile(this.user);
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.loadById())) {
      throw new AppError(`No user was found to id ${this.user.id}`);
    }
  }

  private checkToUpdate(): void {
    const userProperties = [
      {
        '100': this.user.name,
        '50': this.user.password,
        '30': this.user.telephone,
        '11': this.user.cep,
        '3': this.user.state,
        '200': this.user.district,
        '150': this.user.street,
        '5': this.user.number,
        '25': this.user.complement,
        '199': this.user.city,
      },
    ];

    if (this.isClient()) {
      checkAddress({
        cep: this.user.cep,
        city: this.user.city,
        complement: this.user.complement,
        district: this.user.district,
        state: this.user.state,
        street: this.user.street,
        number: this.user.number,
      });
    } else {
      delete this.user.cep;
      delete this.user.city;
      delete this.user.complement;
      delete this.user.district;
      delete this.user.state;
      delete this.user.street;
      delete this.user.number;
    }

    checkEachStringLength(userProperties);
    checkTelephone(this.user.telephone);
    checkEmail(this.user.email);
  }

  private isClient(): boolean {
    return this.user.profile === USER_PROFILE.CLIENT;
  }

  public async inactve(id: string): Promise<void> {
    this.user.id = id;
    await this.checkIfExists();

    await this.repository.inactveById(this.user);
  }
}
