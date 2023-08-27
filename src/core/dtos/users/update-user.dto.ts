import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ default: 'user.email@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'Jonh Travolta' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  role: string;

  @ApiProperty({ default: 'avatar' })
  @IsNotEmpty()
  avatar: number;
}
