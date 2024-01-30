import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardService } from './credit-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { CreditCardController } from './credit-card.controller';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([CreditCard]),
      ],
      controllers: [CreditCardController],
      providers: [CreditCardService],
    }).compile();

    service = module.get<CreditCardService>(CreditCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
