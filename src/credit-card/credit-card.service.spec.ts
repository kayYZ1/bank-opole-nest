import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Provider as CardProvider } from './credit-card.enum';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from './entities/credit-card.entity';

describe('CreditCardService', () => {
  let service: CreditCardService;
  let creditCardRespository: Repository<CreditCard>;

  const CREDITCARD_REPOSITORY_TOKEN = getRepositoryToken(CreditCard);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditCardService,
        {
          provide: CREDITCARD_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreditCardService>(CreditCardService);
    creditCardRespository = module.get<Repository<CreditCard>>(
      CREDITCARD_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creditCardRepository should be define', () => {
    expect(creditCardRespository).toBeDefined();
  });

  describe('creditCard generation', () => {
    it('should generate a valid credit card number', () => {
      const mockCreditCardNumber = service.generateCardNumber(
        CardProvider.VISA,
      );

      expect(mockCreditCardNumber).toHaveLength(16);
    });

    it('should generate a valid cvv number', () => {
      const mockCreditCardNumber = service.generateCardNumber(
        CardProvider.MASTERCARD,
      );
      const mockCVV = service.generateCVV(mockCreditCardNumber);

      expect(mockCVV).toHaveLength(3);
    });
  });
});
