import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class OpenAccountDto {
  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Invalid phone number format.' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;
}
