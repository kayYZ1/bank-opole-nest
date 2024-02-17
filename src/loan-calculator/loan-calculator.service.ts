import { Injectable } from '@nestjs/common';
import { CashLoanDto } from './dto/cashLoan.dto';
import { LoanDto } from './dto/loan.dto';
import { MortgageLoanDto } from './dto/mortgageLoan.dto';

@Injectable()
export class LoanCalculatorService {
  mortgageCalculator(dto: MortgageLoanDto) {
    dto.paymentPeriod *= 12; // Change years into months

    const mortgageLoanRate = this.loanCalculator(dto);

    return mortgageLoanRate;
  }

  cashLoanCalculator(dto: CashLoanDto) {
    const cashLoanRate = this.loanCalculator(dto);

    return cashLoanRate;
  }

  loanCalculator(dto: LoanDto) {
    const numerator =
      dto.loanAmount *
      (dto.interestRate / dto.installments) *
      Math.pow(1 + dto.interestRate / dto.installments, dto.paymentPeriod);

    const denominator =
      Math.pow(1 + dto.interestRate / dto.installments, dto.paymentPeriod) -
      1;

    const result = numerator / denominator;
    const resultFixed = result.toFixed(2);

    return +resultFixed;
  }
}
