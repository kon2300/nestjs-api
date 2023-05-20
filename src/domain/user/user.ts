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
export interface UserDomain {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateUser = Readonly<{
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}>;

type LoginUser = Readonly<{
  userId: string;
}>;

export class User implements UserDomain {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;

  constructor();

  constructor(init: Partial<UserDomain>);

  constructor(init?: Partial<UserDomain>) {
    Object.assign(this, init);
  }

  reConstructor(init: Partial<UserDomain>): void {
    Object.assign(this, init);
    return;
  }

  duplicate(): void {
    if (this.id != null)
      throw new HttpException(
        'すでに登録済みのユーザーです',
        HttpStatus.BAD_REQUEST,
      );

    return;
  }

  exists(): void {
    if (this.id == null)
      throw new HttpException('ユーザが存在しません', HttpStatus.NOT_FOUND);

    return;
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
        userId: this.id,
      };
    }

    throw new HttpException(
      'パスワード、もしくはメールアドレスに誤りがあります',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
