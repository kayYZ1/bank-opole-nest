import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

import { AccountModule } from './account/account.module';
import { Account } from './account/entities/account.entity';
import postgreConfig from './config/postgre.config';
import { CreditCardModule } from './credit-card/credit-card.module';
import { CreditCard } from './credit-card/entities/credit-card.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [postgreConfig],
          envFilePath: ['.env.development.local'],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        password: configService.get<string>('postgre.password'),
        username: 'postgres',
        entities: [User, Account, CreditCard, Transaction],
        database: configService.get<string>('postgre.name'),
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    AccountModule,
    CreditCardModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
