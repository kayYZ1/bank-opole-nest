import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(5, {
    message: 'Your full name needs to have at least 5 characters.',
  })
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @MinLength(5, {
    message: 'Your username needs to have at least 5 characters.',
  })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsInt()
  age: number;

  @IsString()
  @IsEnum(['male', 'female', 'unspecified'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Your password needs to have at least 4 characters.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Role;
}
