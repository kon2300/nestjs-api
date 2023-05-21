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
export type UserDomain = {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private id: string;
  private email: string;
  private password: string;
  private salt: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor();

  constructor(init: Partial<UserDomain>);

  constructor(init?: Partial<UserDomain>) {
    Object.assign(this, init);
  }

  set reConstructor(init: Partial<UserDomain>) {
    Object.assign(this, init);
  }

  get loginProperty() {
    return this.id;
  }

  get saveProperty() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      salt: this.salt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
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

  create(): void {
    this.id = randomUUID();
    this.salt = genSaltSync();
    this.password = hashSync(this.password, this.salt);
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return;
  }

  login(inputPassword: string): void {
    if (!compareSync(inputPassword, this.password)) {
      throw new HttpException(
        'パスワード、もしくはメールアドレスに誤りがあります',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return;
  }
}
