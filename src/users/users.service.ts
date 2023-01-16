import { Injectable, NotFoundException } from '@nestjs/common';
import { NewUserInput } from './new-user.input';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: NewUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    if (!savedUser) {
      throw new NotFoundException(savedUser.user_id);
    }
    return savedUser;
  }

  async update(user_id: number, data: NewUserInput): Promise<boolean> {
    const user = await this.userRepository.findOneOrFail({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(user_id);
    }
    await this.userRepository.update({ user_id }, { ...data });
    return true;
  }

  async list(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(user_id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`Cannot find post id="${user_id}"`);
    }
    return user;
  }

  async delete(user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!user) {
      return false;
    }

    await this.userRepository.delete(user_id);
    return true;
  }
}
