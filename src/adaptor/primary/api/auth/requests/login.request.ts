import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  password: string;
}
