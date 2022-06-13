export enum STATUS_USER {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum USER_PROFILE {
  EMPLOYEE = 'employee',
  CLIENT = 'client',
}

export class User {
  public id: string;
  public status: string;
  public profile: string;
  public salt: string;
  public name: string;
  public email: string;
  public password?: string;
  public telephone: string;
  public first_password: boolean;
  public cep?: string;
  public state?: string;
  public city?: string;
  public district?: string;
  public street?: string;
  public number?: string;
  public complement?: string;
  public created_at: string;
}
