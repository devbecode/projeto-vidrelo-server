import { User, USER_PROFILE } from '../domain/User';

export interface ICreateUserDTO {
  name: string;
  email: string;
  telephone: string;
  profile: USER_PROFILE;
  password?: string;
  cep?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface IListAllUsersDTO {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  users: User[];
}

export interface IFilterUsersDTO {
  offset?: number;
  limit?: number;
  status?: string;
  profile?: string;
}

export interface IUpdateUserDTO {
  id: string;
  name: string;
  password: string;
  telephone: string;
  profile: string;
  cep?: string;
  state?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface IAddressClientProfile {
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

export interface IChangePasswordDTO {
  user_id: string | undefined;
  user_email: string | undefined;
  newPassword: string;
}
