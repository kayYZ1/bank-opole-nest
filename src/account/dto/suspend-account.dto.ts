import { IsString, IsEnum } from 'class-validator';
import { Status } from 'src/account/account.enum';

export class SuspendAccountDto {
  @IsString()
  @IsEnum(Status)
  status: Status;
}
