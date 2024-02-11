import { Injectable } from '@nestjs/common';
import { CashLoanDto } from './dto/cashLoan.dto';

@Injectable()
export class LoanCalculatorService {
  async mortgageCalculator() {}

  async cashLoanCalculator(dto: CashLoanDto) {
    const numenator =
      dto.loanAmount *
      Math.pow(
        (dto.interestRate / dto.installments) *
          (1 + dto.interestRate / dto.installments),
        dto.monthPeriodRepayment,
      );

    const denominator =
      1 +
      Math.pow(dto.interestRate / dto.installments, dto.monthPeriodRepayment) -
      1;

    return numenator / denominator;
  }
}
