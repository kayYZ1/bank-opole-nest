import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Country, Status } from '../account.enum';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'enum', enum: Country, default: Country.PL })
  country: Country;

  @Column({ type: 'varchar', length: 20 })
  city: string;

  @Column({ type: 'varchar', length: 40 })
  street: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn({ type: 'date' })
  created: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
