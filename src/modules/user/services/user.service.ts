import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domains/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../domains/dtos/create-user.dto';
import { UpdateUserDto } from '../domains/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
