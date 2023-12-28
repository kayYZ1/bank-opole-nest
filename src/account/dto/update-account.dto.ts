import { PartialType } from '@nestjs/mapped-types';
import { OpenAccountDto } from './open-account.dto';

export class UpdateAccountDto extends PartialType(OpenAccountDto) {}
