import { Injectable, NotFoundException } from '@nestjs/common';
import { NewRoleInput } from './new-role.input';
import { Role } from './roles.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(data: NewRoleInput): Promise<Role> {
    const role = this.roleRepository.create(data);
    const savedRole = await this.roleRepository.save(role);
    if (!savedRole) {
      throw new NotFoundException(savedRole.id);
    }
    return savedRole;
  }

  async update(id: number, data: NewRoleInput): Promise<boolean> {
    const role = await this.roleRepository.findOneOrFail({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(id);
    }
    await this.roleRepository.update({ id }, { ...data });
    return true;
  }

  async list(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneOrFail({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`Cannot find post id="${id}"`);
    }
    return role;
  }

  async delete(id: number): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      where: {
        id,
      },
    });

    if (!role) {
      return false;
    }

    await this.roleRepository.delete(id);
    return true;
  }
}
