import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  fullName: string;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar', length: 35 })
  password: string;

  @Column({ type: 'varchar' })
  age: number;

  @Column({ type: 'enum', enum: ['male', 'female', 'unspecified'] })
  gender: string;
}
