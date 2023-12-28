import { Body, Controller, Req, UseGuards, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { OpenAccountDto } from './dto/open-account.dto';
import { Request } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  openAccount(@Body() dto: OpenAccountDto, @Req() req: Request) {
    const userId = req.user['subscriber'];
    return this.accountService.openAccount(dto, userId);
  }
}
