import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthLoginRequest {
  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(20)
  email: string;

  @ApiProperty({
    description: 'パスワード',
    example: 'secretPassword',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  password: string;
}
