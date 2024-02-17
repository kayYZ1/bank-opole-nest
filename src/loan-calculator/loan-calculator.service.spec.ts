import { Test, TestingModule } from '@nestjs/testing';
import { CashLoanDto } from './dto/cashLoan.dto';
import { MortgageLoanDto } from './dto/mortgageLoan.dto';
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

  describe('loan rate calculation logic', () => {
    it('should return correct monthly rate (cash)', () => {
      const mockDto: CashLoanDto = {
        loanAmount: 20000,
        installments: 12,
        paymentPeriod: 24, //months
        interestRate: 0.08,
      };

      const rate = service.cashLoanCalculator(mockDto);

      expect(rate).toBe(904.55);
    });

    it('should return correct stable rate (mortgage)', () => {
      const mockDto: MortgageLoanDto = {
        loanAmount: 300000,
        installments: 12,
        paymentPeriod: 25, //years
        interestRate: 0.04,
      };

      const rate = service.mortgageCalculator(mockDto);

      expect(rate).toBe(1583.51);
    });
  });
});
