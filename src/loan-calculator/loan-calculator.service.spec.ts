import { Test, TestingModule } from '@nestjs/testing';
import { CashLoanDto } from './dto/cashLoan.dto';
import { LoanCalculatorService } from './loan-calculator.service';

describe('LoanCalculatorService', () => {
  let service: LoanCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanCalculatorService],
    }).compile();

    service = module.get<LoanCalculatorService>(LoanCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct monthly rate', async () => {
    const mockDto: CashLoanDto = {
      loanAmount: 20000,
      installments: 12,
      monthPeriodRepayment: 24,
      provision: 0,
      interestRate: 0.08,
    };
    const result = await service.cashLoanCalculator(mockDto);

    expect(result).toBe(904.55);
  });
});
