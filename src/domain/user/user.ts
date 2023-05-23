import { HttpException, HttpStatus } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

type UserDomain = Readonly<{
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}>;

type LoginProperty = Readonly<{
  id: string;
}>;

type SaveProperty = {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  /** ユーザーID */
  private id: string;

  /** emailアドレス */
  private email: string;

  /** パスワード */
  private password: string;

  /** パスワード(hash) */
  private salt: string;

  /** 登録日 */
  private createdAt: Date;

  /** 更新日 */
  private updatedAt: Date;

  /** 初期化 */
  constructor(init?: Partial<UserDomain> | null) {
    Object.assign(this, init);
  }

  /**
   * 初期化した後に値を更新する
   * - ex: {@link duplicate}の処理を通過した後に、入力された値を詰める
   * */
  set reConstructor(init: Partial<UserDomain> | null) {
    Object.assign(this, init);
  }

  /** ログイン処理に必要な情報を取得する */
  get loginProperty(): LoginProperty {
    return {
      id: this.id,
    };
  }

  /** 保存処理に必要な値を取得する */
  get saveProperty(): SaveProperty {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      salt: this.salt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /** ユーザーの重複確認 */
  duplicate(): void {
    if (this.id != null)
      throw new HttpException(
        'すでに登録済みのユーザーです',
        HttpStatus.BAD_REQUEST,
      );

    return;
  }

  /** ユーザーの存在確認 */
  exists(): void {
    if (this.id == null)
      throw new HttpException('ユーザが存在しません', HttpStatus.NOT_FOUND);

    return;
  }

  /** ユーザーを作成する */
  create(): void {
    this.id = randomUUID();
    this.salt = genSaltSync();
    this.password = hashSync(this.password, this.salt);
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return;
  }

  /** ログインの確認 */
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
