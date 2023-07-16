import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'user.email@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'Jonh Travolta' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'testPassword' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'testPassword' })
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({ default: '{roles:{admin, user}}' })
  @IsNotEmpty()
  roles: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  role: number;

  @ApiProperty({ default: 'avatar' })
  @IsNotEmpty()
  avatar: number;

  @ApiProperty({ default: 'test' })
  @IsNotEmpty()
  test: number;
}
