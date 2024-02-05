import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { transferMoneyDto } from './dto/transferMoney.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(AccessTokenGuard)
  @Post('/new')
  transferMoneyAccountNumber(
    @Body() dto: transferMoneyDto,
  ) {
    return this.transactionService.transferMoneyAccountNumber(dto);
  }
}
