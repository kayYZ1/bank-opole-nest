import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '../auth/auth.enum';
import { ROLES } from '../auth/decorators/roles.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { transferMoneyDto } from './dto/transferMoney.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(AccessTokenGuard)
  @Post('/new')
  transferMoneyAccountNumber(@Body() dto: transferMoneyDto) {
    return this.transactionService.transferMoneyAccountNumber(dto);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @ROLES(Role.Admin)
  @Get('/')
  getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }
}
