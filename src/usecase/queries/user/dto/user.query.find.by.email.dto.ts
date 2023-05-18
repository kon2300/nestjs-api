import { User } from '@/domain/user/user';

export type FindByEmailInputDto = {
  email: string;
};

export type FindByEmailOutputDto = User;
