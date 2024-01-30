import { IsEnum, IsString } from 'class-validator';

import { Status } from '../account.enum';

export class SuspendAccountDto {
  @IsString()
  @IsEnum(Status)
  status: Status;
}
