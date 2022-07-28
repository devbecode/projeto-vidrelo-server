export interface ICreateUserDTO {
  id?: string;
  email: string;
  status?: string;
  password: string;
  created_at?: string;
}

export interface IChangePassword {
  id: string;
  password: string;
}
export interface ICredentials {
  email: string;
  emailEncrypted: string;
}
