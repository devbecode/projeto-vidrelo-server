export interface IUserToAuthDTO {
  email: string;
  password: string;
}

export interface IAuthenticatedDTO {
  userId: string;
  accessToken: string;
  createdAt: string;
}
