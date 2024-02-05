import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { transferMoneyDto } from './dto/transferMoney.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async transferMoneyAccountNumber(dto: transferMoneyDto) {
    const transaction: Transaction = new Transaction();

    transaction.sender = dto.senderAccountNumber;
    transaction.receiver = dto.receiverAccountNumber;
    transaction.title = dto.title;
    transaction.amount = dto.amount;
    /*
      ToDo: Update both credit cards with new amount 
    */
    return this.transactionRepository.save(transaction);
  }

  async getAllTransactions() {
    return this.transactionRepository.find(); //Admin only
  }

  async getMyTransactions(userId: number) {
    //No user relation (??)
  }
}
