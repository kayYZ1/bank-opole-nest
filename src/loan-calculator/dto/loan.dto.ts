import { IsInt, IsNotEmpty } from 'class-validator';

export class LoanDto {
  @IsInt()
  @IsNotEmpty()
  loanAmount: number;

  @IsInt()
  @IsNotEmpty()
  paymentPeriod: number;

  @IsInt()
  @IsNotEmpty()
  interestRate: number;

  @IsInt()
  @IsNotEmpty()
  installments: number;
}
