import { genSaltSync, hashSync } from 'bcrypt';
import { UserCreateInputDto } from '@/use-case/api/user/create/dto/userCreateDto';

const salt = genSaltSync();

export const userForTest = {
  id: 'testId',
  email: 'test@test.com',
  password: hashSync('password', salt),
  salt: salt,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userCreateInputForTest: UserCreateInputDto = {
  email: 'test@test.com',
  password: 'testPassword',
};
