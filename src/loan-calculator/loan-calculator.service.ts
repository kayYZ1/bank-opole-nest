import { Injectable } from '@nestjs/common';
import { CashLoanDto } from './dto/cashLoan.dto';

@Injectable()
export class LoanCalculatorService {
  async mortgageCalculator() {}

  async cashLoanCalculator(dto: CashLoanDto) {
    const numenator =
      dto.loanAmount *
      (dto.interestRate / dto.installments) *
      Math.pow(
        1 + dto.interestRate / dto.installments,
        dto.monthPeriodRepayment,
      );

    const denominator =
      Math.pow(
        1 + dto.interestRate / dto.installments,
        dto.monthPeriodRepayment,
      ) - 1;

    const result = numenator / denominator;
    const resultFixed = result.toFixed(2);

    return +resultFixed;
  }
}
