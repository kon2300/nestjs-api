import { genSaltSync, hashSync } from 'bcrypt';
import { AuthLoginInputDto } from '@/use-case/api/auth/login/dto/authLoginDto';

const salt = genSaltSync();

export const testDataForUser = {
  id: 'testId',
  email: 'test@example.com',
  password: hashSync('password', salt),
  salt: salt,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const testDataForAuthLoginInput: AuthLoginInputDto = {
  email: 'test@example.com',
  password: 'password',
};

export const failedTestDataAuthLoginInput: AuthLoginInputDto = {
  email: 'test@example.com',
  password: 'FailingPasswords',
};
