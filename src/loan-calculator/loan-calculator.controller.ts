import { Controller } from '@nestjs/common';
import { LoanCalculatorService } from './loan-calculator.service';

@Controller('loan-calculator')
export class LoanCalculatorController {
  constructor(private readonly loanCalculatorService: LoanCalculatorService) {}
}
