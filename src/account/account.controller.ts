import {
  Body,
  Controller,
  Req,
  UseGuards,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { OpenAccountDto } from './dto/open-account.dto';
import { Request } from 'express';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { SuspendAccountDto } from './dto/suspend-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

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
