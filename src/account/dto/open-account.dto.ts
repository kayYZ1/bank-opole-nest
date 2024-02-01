import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Country } from '../account.enum';

export class OpenAccountDto {
  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Invalid phone number format.' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  country: Country;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;
}
