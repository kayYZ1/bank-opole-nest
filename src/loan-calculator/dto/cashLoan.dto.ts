import { IsInt, IsNotEmpty } from 'class-validator';

export class CashLoanDto {
  @IsInt()
  @IsNotEmpty()
  loanAmount: number;

  @IsInt()
  @IsNotEmpty()
  monthPeriodRepayment: number;

  @IsInt()
  @IsNotEmpty()
  interestRate: number;

  @IsInt()
  @IsNotEmpty()
  provision: number;
}
