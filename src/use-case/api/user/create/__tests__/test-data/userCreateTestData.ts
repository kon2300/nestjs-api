import { genSaltSync, hashSync } from 'bcrypt';
import { UserCreateInputDto } from '@/use-case/api/user/create/dto/userCreateDto';
import { Readable } from 'stream';

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

export const testFileDataForUser: Express.Multer.File = {
  originalname: 'test.name',
  mimetype: 'test.type',
  path: 'test.url',
  buffer: Buffer.from('whatever'),
  fieldname: '',
  encoding: '',
  size: 0,
  stream: new Readable(),
  destination: '',
  filename: '',
};

export const testDataForUserCreateInput: UserCreateInputDto = {
  email: 'test@example.com',
  password: 'testPassword',
};
