import { genSaltSync, hashSync } from 'bcrypt';
import { AuthLoginInputDto } from '@/use-case/api/auth/login/dto/authLoginDto';

const salt = genSaltSync();

export const userForTest = {
  id: 'testId',
  email: 'test@test.com',
  password: hashSync('password', salt),
  salt: salt,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const authLoginInputForTest: AuthLoginInputDto = {
  email: 'test@test.com',
  password: 'password',
};

export const authLoginInputForFailedTest: AuthLoginInputDto = {
  email: 'test@test.com',
  password: 'FailingPasswords',
};
