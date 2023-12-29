import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/enums/roles.enum';
import { CreditCard } from 'src/credit-card/entities/credit-card.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  fullName: string;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar' })
  age: number;

  @Column({ type: 'enum', enum: ['male', 'female', 'unspecified'] })
  gender: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  refreshToken: string | null;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @OneToMany(() => CreditCard, (creditCard) => creditCard.user)
  creditCards: CreditCard[];
}
