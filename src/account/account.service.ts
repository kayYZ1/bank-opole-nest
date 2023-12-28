import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { OpenAccountDto } from './dto/open-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRespository: Repository<Account>,
  ) {}

  async openAccount(dto: OpenAccountDto, userId: any) {
    const accountExist = await this.accountRespository.findOne({
      where: { user: { id: userId } },
    });
    if (accountExist)
      throw new BadRequestException('You already have one account.');

    const account: Account = new Account();
    account.phone = dto.phone;
    account.city = dto.city;
    account.country = dto.country;
    account.street = dto.street;
    account.user = userId; //Potential error case to fix

    return this.accountRespository.save(account);
  }
}
