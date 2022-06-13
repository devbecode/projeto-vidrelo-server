export interface IUserToAuthDTO {
  username: string;
  password: string;
}

export interface IAuthenticatedDTO {
  userId: string;
  accessToken: string;
  createdAt: string;
}
