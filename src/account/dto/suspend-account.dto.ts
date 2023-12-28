import { IsString, IsEnum } from 'class-validator';
import { Status } from 'src/enums/accounts.enum';

export class SuspendAccountDto {
  @IsString()
  @IsEnum(Status)
  status: Status;
}
