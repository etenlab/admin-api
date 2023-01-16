import { Injectable, NotFoundException } from '@nestjs/common';
import { NewOrganizationInput } from './new-organization.input';
import { Organization } from './organizations.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(data: NewOrganizationInput): Promise<Organization> {
    const organization = this.organizationRepository.create(data);
    const savedOrganization = await this.organizationRepository.save(
      organization,
    );
    if (!savedOrganization) {
      throw new NotFoundException(savedOrganization.id);
    }
    return savedOrganization;
  }

  async update(id: number, data: NewOrganizationInput): Promise<boolean> {
    const organization = await this.organizationRepository.findOneOrFail({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(id);
    }
    await this.organizationRepository.update({ id }, { ...data });
    return true;
  }

  async list(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOrganizationById(id: number): Promise<Organization> {
    const organization = await this.organizationRepository.findOneOrFail({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(`Cannot find post id="${id}"`);
    }
    return organization;
  }

  async delete(id: number): Promise<boolean> {
    const organization = await this.organizationRepository.findOne({
      where: {
        id,
      },
    });

    if (!organization) {
      return false;
    }

    await this.organizationRepository.delete(id);
    return true;
  }
}
