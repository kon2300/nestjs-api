import { UserType } from '@/domain/user/user.domain';

export type FindByEmailInputDto = {
  email: string;
};

export type FindByEmailOutputDto = UserType | null;
