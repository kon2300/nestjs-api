import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthLoginRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  password: string;
}
