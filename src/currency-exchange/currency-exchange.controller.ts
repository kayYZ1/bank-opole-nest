import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CurrencyExchangeService } from './currency-exchange.service';

@Controller('currency-exchange')
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  scrapeCurrencyExchange() {
    return this.currencyExchangeService.scrapeCurrencyExchange();
  }
}
