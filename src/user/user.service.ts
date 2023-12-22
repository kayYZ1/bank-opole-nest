import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  registerUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.fullName = createUserDto.fullName;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.age = createUserDto.age;
    user.gender = createUserDto.gender;

    return this.userRepository.save(user);
  }

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
