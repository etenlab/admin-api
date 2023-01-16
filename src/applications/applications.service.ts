import { Injectable, NotFoundException } from '@nestjs/common';
import { NewApplicationInput } from './new-application.input';
import { Application } from './applications.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(data: NewApplicationInput): Promise<Application> {
    const application = this.applicationRepository.create(data);
    const savedApplication = await this.applicationRepository.save(application);
    if (!savedApplication) {
      throw new NotFoundException(savedApplication.id);
    }
    return savedApplication;
  }

  async update(id: number, data: NewApplicationInput): Promise<boolean> {
    const application = await this.applicationRepository.findOneOrFail({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(id);
    }
    await this.applicationRepository.update({ id }, { ...data });
    return true;
  }

  async list(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async findApplicationById(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOneOrFail({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(`Cannot find post id="${id}"`);
    }
    return application;
  }

  async delete(id: number): Promise<boolean> {
    const application = await this.applicationRepository.findOne({
      where: {
        id,
      },
    });

    if (!application) {
      return false;
    }

    await this.applicationRepository.delete(id);
    return true;
  }
}
