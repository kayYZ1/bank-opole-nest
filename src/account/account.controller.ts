import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from './account.service';
import { OpenAccountDto } from './dto/open-account.dto';
import { SuspendAccountDto } from './dto/suspend-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

import { Role } from '../auth/auth.enum';
import { ROLES } from '../auth/decorators/roles.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  openAccount(@Body() dto: OpenAccountDto, @Req() req: Request) {
    const userId = req.user['subscriber'];
    return this.accountService.openAccount(dto, userId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ROLES(Role.Admin) //Suspending account only possible for admin
  suspendAccount(@Body() dto: SuspendAccountDto, @Param('id') id: string) {
    return this.accountService.suspendAccount(dto, +id);
  }

  @Patch('update/:id')
  @UseGuards(AccessTokenGuard)
  updateAccount(@Body() dto: UpdateAccountDto, @Param('id') id: string) {
    return this.accountService.updateAccount(dto, +id);
  }
}
