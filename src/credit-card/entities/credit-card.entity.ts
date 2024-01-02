import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CardStatus, CardType, Provider } from 'src/enums/credit-card.enum';

import { User } from 'src/user/entities/user.entity';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Column({ type: 'enum', enum: CardType })
  type: CardType;

  @Column()
  cardNumber: string;

  @Column()
  cvv: string;

  @Column({ type: 'enum', enum: CardStatus, default: CardStatus.ACTIVE })
  cardStatus: CardStatus;

  @CreateDateColumn({ type: 'date' })
  issued: Date;

  @Column({ type: 'date' })
  validTo: Date;

  @ManyToOne(() => User, (user) => user.creditCards)
  user: User;
}
