import { HttpException, HttpStatus } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import { CreateUser } from '@/domain/user/dto/create.user.dto';
import { LoginUser } from '@/domain/user/dto/login.user.dto';

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
    if (init === null)
      throw new HttpException('ユーザが存在しません', HttpStatus.NOT_FOUND);

    Object.assign(this, init);
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
        id: this.id,
      };
    }

    throw new HttpException(
      'パスワード、もしくはメールアドレスに誤りがあります',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
