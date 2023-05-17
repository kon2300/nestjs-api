import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  password: string;
}
