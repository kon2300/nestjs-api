import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UserCreateRequest {
  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  email: string;

  @ApiProperty({
    description: 'パスワード',
    example: 'secretPassword',
  })
  @IsNotEmpty()
  @MaxLength(20)
  password: string;
}
