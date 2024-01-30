import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

import { Role } from '../auth/auth.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.fullName = createUserDto.fullName;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.age = createUserDto.age;
    user.gender = createUserDto.gender;
    user.role = Role.User;

    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    await this.userRepository.update(id, updateUserDto);
    return `User ${id} updated!`;
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async removeUser(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return `User ${id} deleted!`;
  }
}
