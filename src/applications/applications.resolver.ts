import { NotFoundException, Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Application } from './applications.model';
import { ApplicationsService } from './applications.service';
import { NewApplicationInput } from './new-application.input';

@Resolver(() => Application)
@Injectable()
export class ApplicationsResolver {
  static application: any;
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Query(() => [Application])
  async applications(): Promise<Application[]> {
    const applications = await this.applicationsService.list();
    if (!applications) {
      return [];
    }
    return applications;
  }

  @Mutation(() => Application)
  async createApplication(
    @Args('newApplicationData') newApplicationData: NewApplicationInput,
  ): Promise<Application> {
    const { id } = await this.applicationsService.create(newApplicationData);
    const application = await this.applicationsService.findApplicationById(id);
    if (!application) {
      throw new NotFoundException(id);
    }
    return application;
  }

  @Mutation(() => Boolean)
  async deleteApplication(@Args('id', { type: () => Int }) id: number) {
    return this.applicationsService.delete(id);
  }
}
