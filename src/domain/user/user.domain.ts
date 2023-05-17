import { HttpException, HttpStatus } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

/**
 * @param id ユーザーID
 * @param email emailアドレス
 * @param password パスワード
 * @param salt パスワード(hash)
 * @param createdAt 登録日
 * @param updatedAt 更新日
 */
export interface UserType {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = Readonly<{
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type LoginUser = Readonly<{
  id: string;
}>;

export class User implements UserType {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(init: Partial<UserType>) {
    Object.assign(this, init);
  }

  create(): CreateUser {
    this.id = randomUUID();
    this.salt = genSaltSync();
    this.password = hashSync(this.password, this.salt);
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return {
      id: this.id,
      email: this.email,
      password: this.password,
      salt: this.salt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  login(inputPassword: string): LoginUser {
    if (compareSync(inputPassword, this.password)) {
      return {
        id: this.id,
      };
    }

    throw new HttpException(
      'パスワード、もしくはメールアドレスに誤りがあります',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
