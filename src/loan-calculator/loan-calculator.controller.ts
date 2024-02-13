import { Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CashLoanDto } from './dto/cashLoan.dto';
import { MortgageLoanDto } from './dto/mortgageLoan.dto';
import { LoanCalculatorService } from './loan-calculator.service';

@Controller('loan-calculator')
export class LoanCalculatorController {
  constructor(private readonly loanCalculatorService: LoanCalculatorService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/mortgage')
  mortgageLoanCalculator(dto: MortgageLoanDto) {
    return this.loanCalculatorService.mortgageCalculator(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/cash')
  cashLoanCalculator(dto: CashLoanDto) {
    return this.loanCalculatorService.cashLoanCalculator(dto);
  }
}
