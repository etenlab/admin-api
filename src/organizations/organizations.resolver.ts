import { NotFoundException, Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Organization } from './organizations.model';
import { OrganizationsService } from './organizations.service';
import { NewOrganizationInput } from './new-organization.input';

@Resolver(() => Organization)
@Injectable()
export class OrganizationsResolver {
  static organization: any;
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query(() => [Organization])
  async organizations(): Promise<Organization[]> {
    const organizations = await this.organizationsService.list();
    if (!organizations) {
      return [];
    }
    return organizations;
  }

  @Mutation(() => Organization)
  async createOrganization(
    @Args('newOrganizationData') newOrganizationData: NewOrganizationInput,
  ): Promise<Organization> {
    const { id } = await this.organizationsService.create(newOrganizationData);
    const organization = await this.organizationsService.findOrganizationById(
      id,
    );
    if (!organization) {
      throw new NotFoundException(id);
    }
    return organization;
  }

  @Mutation(() => Boolean)
  async deleteOrganization(@Args('id', { type: () => Int }) id: number) {
    return this.organizationsService.delete(id);
  }
}
