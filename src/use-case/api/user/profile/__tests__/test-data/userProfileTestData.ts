import { genSaltSync, hashSync } from 'bcrypt';
import {
  UserProfileInputDto,
  UserProfileOutputDto,
} from '@/use-case/api/user/profile/dto/userProfileDto';

const salt = genSaltSync();

export const testDataForUser = {
  id: 'testId',
  email: 'test@example.com',
  password: hashSync('password', salt),
  salt: salt,
  filePath: 'testFilePath',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const testDataForUserProfileInput: UserProfileInputDto = {
  userId: 'testId',
};

export const testDataForUserProfileOutput: UserProfileOutputDto = {
  id: testDataForUser.id,
  file: 'testFile',
  email: testDataForUser.email,
  createdAt: testDataForUser.createdAt,
  updatedAt: testDataForUser.updatedAt,
};
