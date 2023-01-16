import { Injectable, NotFoundException } from '@nestjs/common';
import { NewUserRoleInput } from './new-user-roles.input';
import { UserRole } from './user-roles.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async create(data: NewUserRoleInput): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(data);
    const savedUserRole = await this.userRoleRepository.save(userRole);
    if (!savedUserRole) {
      throw new NotFoundException(savedUserRole.id);
    }
    return savedUserRole;
  }

  async update(id: number, data: NewUserRoleInput): Promise<boolean> {
    const userRole = await this.userRoleRepository.findOneOrFail({
      where: { id },
    });
    if (!userRole) {
      throw new NotFoundException(id);
    }
    await this.userRoleRepository.update({ id }, { ...data });
    return true;
  }

  async list(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  async getUserRolesByUserId(user_id: number): Promise<UserRole[]> {
    return this.userRoleRepository.find({
      relations: ['user', 'organization', 'application', 'userRole'],
      where: {
        user_id: user_id,
      },
    });
  }

  async findUserRoleById(id: number): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOneOrFail({
      relations: ['user', 'organization', 'application', 'userRole'],
      where: { id },
    });
    if (!userRole) {
      throw new NotFoundException(`Cannot find post id="${id}"`);
    }
    return userRole;
  }

  async delete(id: number): Promise<boolean> {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        id,
      },
    });

    if (!userRole) {
      return false;
    }

    await this.userRoleRepository.delete(id);
    return true;
  }

  async checkUserExists(userRoleInpt: NewUserRoleInput): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        user_id: userRoleInpt.user_id,
        org: userRoleInpt.org,
        app: userRoleInpt.app,
        role: userRoleInpt.role,
      },
    });
    return userRole;
  }
}
