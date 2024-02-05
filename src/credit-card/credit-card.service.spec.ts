import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { Provider as CardProvider } from './credit-card.enum';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from './entities/credit-card.entity';

describe('CreditCardService', () => {
  let creditCardService: CreditCardService;
  let accountService: AccountService;

  let creditCardRespository: Repository<CreditCard>;
  let accountRepository: Repository<Account>;

  const CREDITCARD_REPOSITORY_TOKEN = getRepositoryToken(CreditCard);
  const ACCOUNT_REPOSITORY_TOKEN = getRepositoryToken(Account);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditCardService,
        AccountService,
        {
          provide: CREDITCARD_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: ACCOUNT_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    creditCardService = module.get<CreditCardService>(CreditCardService);
    accountService = module.get<AccountService>(AccountService);

    creditCardRespository = module.get<Repository<CreditCard>>(
      CREDITCARD_REPOSITORY_TOKEN,
    );
    accountRepository = module.get<Repository<Account>>(
      ACCOUNT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(creditCardService).toBeDefined();
  });

  it('creditCardRepository should be defined', () => {
    expect(creditCardRespository).toBeDefined();
  });

  describe('creditCard generation', () => {
    it('should generate a valid credit card number', () => {
      const mockCreditCardNumber = creditCardService.generateCardNumber(
        CardProvider.VISA,
      );

      expect(mockCreditCardNumber).toHaveLength(16);
    });

    it('should generate a valid cvv number', () => {
      const mockCreditCardNumber = creditCardService.generateCardNumber(
        CardProvider.MASTERCARD,
      );
      const mockCVV = creditCardService.generateCVV(mockCreditCardNumber);

      expect(mockCVV).toHaveLength(3);
    });
  });
});
