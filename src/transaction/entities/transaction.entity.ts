import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @Column()
  title: string;

  @Column()
  amount: number;

  @CreateDateColumn({ type: 'date' })
  transactionDate: Date;
}
