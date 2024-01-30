import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OpenAccountDto } from './dto/open-account.dto';
import { SuspendAccountDto } from './dto/suspend-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

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

  async suspendAccount(dto: SuspendAccountDto, id: number) {
    const accountExist = await this.accountRespository.findOneBy({ id });
    if (!accountExist)
      throw new BadRequestException(
        'Bank account with that id does not exist.',
      );

    await this.accountRespository.update(id, dto);
    return `Account ${id} changed it status to ${dto.status}`;
  }

  async updateAccount(dto: UpdateAccountDto, id: number) {
    const accountExist = await this.accountRespository.findOneBy({ id });
    if (!accountExist)
      throw new BadRequestException(
        'Bank account with that id does not exist.',
      );

    await this.accountRespository.update(id, dto);
    return `Account ${id} has been updated`;
  }
}
