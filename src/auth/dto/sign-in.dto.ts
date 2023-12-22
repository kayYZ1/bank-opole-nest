import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Your password needs to have at least 4 characters.',
  })
  password: string;
}
