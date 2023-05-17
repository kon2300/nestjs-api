import { LoginUser } from '@/domain/user/user.domain';

export type AuthLoginInputDto = LoginUser;

export type AuthLoginOutputDto = {
  accessToken: string;
};
