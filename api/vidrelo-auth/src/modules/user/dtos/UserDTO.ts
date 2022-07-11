export interface ICreateUserDTO {
  id?: string;
  name: string;
  status?: string;
  password: string;
  created_at?: string;
}

export interface IChangePassword {
  id: string;
  password: string;
}
