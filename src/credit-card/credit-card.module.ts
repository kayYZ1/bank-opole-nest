import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from './entities/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CreditCardController],
  providers: [CreditCardService],
})
export class CreditCardModule {}
