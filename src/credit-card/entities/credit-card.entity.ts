import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardType, CardStatus } from 'src/enums/credit-card.enum';
import { Length } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column({ type: 'enum', enum: CardType })
  type: CardType;

  @Column()
  @Length(16)
  cardNumber: number;

  @Column()
  @Length(3)
  cvv: number;

  @Column({ type: 'enum', enum: CardStatus, default: CardStatus.ACTIVE })
  cardStatus: CardStatus;

  @CreateDateColumn({ type: 'date' })
  issued: Date;

  @Column({ type: 'date' })
  validTo: Date;

  @ManyToOne(() => User, (user) => user.creditCards)
  user: User;
}
