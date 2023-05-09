import { genSaltSync, hashSync } from 'bcrypt';

export type TestUser = {
  userId: number;
  username: string;
  password: string;
};

export type CreateUser = Readonly<{
  id: number;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export class User {
  private id: number;
  private email: string;
  private password: string;
  private salt: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(email: string, password: string) {
    this.id = 1;
    this.email = email;
    this.salt = genSaltSync();
    this.password = hashSync(password, this.salt);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  create(): CreateUser {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      salt: this.salt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
