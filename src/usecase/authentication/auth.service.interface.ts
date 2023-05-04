export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE_PROVIDER';

export interface IAuthService {
  validateUser(
    inputPassword: string,
    password: string,
  ): Promise<{ id: string } | null>;
  login(user: {
    username: string;
  }): Promise<{ accessToken: string; user: { username: string } }>;
}
