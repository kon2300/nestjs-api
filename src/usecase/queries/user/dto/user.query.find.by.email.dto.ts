import { User } from '@/domain/user/user.domain';

export type FindByEmailInputDto = {
  email: string;
};

export type FindByEmailOutputDto = User;
