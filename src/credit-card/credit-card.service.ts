import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Provider } from './credit-card.enum';
import { IPrefix } from './credit-card.interfaces';
import { IssueCardDto } from './dto/issue-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreditCard } from './entities/credit-card.entity';

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
    creditCard.cvv = this.generateCVV(creditCard.cardNumber);

    return this.creditCardRespository.save(creditCard);
  }

  async getAllCards(userId: any) {
    const creditCards = await this.creditCardRespository.findBy(userId);

    return creditCards;
  }

  async getCard(id: number) {
    const creditCard = await this.creditCardRespository.findOneBy({ id });
    return creditCard;
  }

  async changeStatus(dto: UpdateCardDto, id: number) {
    const creditCard = await this.creditCardRespository.findOneBy({ id });
    if (!creditCard) {
      throw new BadRequestException('Credit card with such id does not exist');
    }
    await this.creditCardRespository.update(id, dto);

    return `Credit card ${id} changed it status to ${dto.cardStatus}`;
  }

  generateCVV(cardNumber: string) {
    let numberBinary = +cardNumber;
    const stringBinary = numberBinary.toString(2);

    const firstHalf = +stringBinary.slice(0, 8);
    const secondHalf = +stringBinary.slice(8, -1);

    const stringsXOR = firstHalf ^ secondHalf;

    const result = stringsXOR.toString(8);
    const numbersOnly = result.replace(/[^0-9]/g, '');

    return numbersOnly.split('').reverse().join('').slice(0, 3);
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
