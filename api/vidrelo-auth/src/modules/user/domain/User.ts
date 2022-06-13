import { Auth } from '../../auth/domain/Auth';

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class User {
  public id: string;
  public status: string;
  public name: string;
  public password: string;
  public created_at: string;
  public auth: Auth;
}
