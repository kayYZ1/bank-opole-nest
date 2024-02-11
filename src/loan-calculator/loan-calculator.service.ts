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

    console.log(numenator);

    const denominator =
      (1 +
      Math.pow(dto.interestRate / dto.installments, dto.monthPeriodRepayment) -
      1);
    console.log(denominator)

    const result = numenator / denominator;
    console.log(result);
    return result;
  }
}
