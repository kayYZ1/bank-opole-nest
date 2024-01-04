import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { Repository } from 'typeorm';
import { IssueCardDto } from './dto/issue-card.dto';

import { Provider } from 'src/enums/credit-card.enum';
import { IPrefix } from './credit-card.interfaces';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardRespository: Repository<CreditCard>,
  ) {}

  async issueCard(dto: IssueCardDto, userId: any) {
    const creditCard: CreditCard = new CreditCard();

    creditCard.provider = dto.provider;
    creditCard.type = dto.type;
    creditCard.user = userId;
    creditCard.cardNumber = this.generateCardNumber(creditCard.provider);
    creditCard.cvv = '123';

    return this.creditCardRespository.save(creditCard);
  }

  generateCardNumber(provider: Provider) {
    const prefix = [
      { provider: Provider.VISA, min: 40, max: 49 },
      { provider: Provider.MASTERCARD, min: 51, max: 55 },
    ];

    switch (provider) {
      case Provider.VISA:
        const prefixVisa = this.generatePrefixNumber(prefix[0]);
        const numbersVisa = this.generateRandomNumber();
        return prefixVisa + numbersVisa;
      case Provider.MASTERCARD:
        const prefixMastercard = this.generatePrefixNumber(prefix[1]);
        const numbersMastercard = this.generateRandomNumber();
        return prefixMastercard + numbersMastercard;
      default:
        return '';
    }
  }

  generatePrefixNumber(prefix: IPrefix) {
    let prefixNumbers = '';
    for (let i = 0; i < 2; i++) {
      prefixNumbers += Math.floor(
        Math.random() * (prefix.max - prefix.min) + prefix.min,
      );
    }

    return prefixNumbers;
  }

  generateRandomNumber() {
    let numbers = '';
    for (let i = 0; i < 12; i++) {
      numbers += Math.floor(Math.random() * 10);
    }

    return numbers;
  }
}
