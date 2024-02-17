import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardModule } from '../credit-card/credit-card.module';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CreditCardModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
