import { NotFoundException, Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { NewRoleInput } from './new-role.input';

@Resolver(() => Role)
@Injectable()
export class RolesResolver {
  static role: any;
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Role])
  async roles(): Promise<Role[]> {
    const roles = await this.rolesService.list();
    if (!roles) {
      return [];
    }
    return roles;
  }

  @Mutation(() => Role)
  async createRole(
    @Args('newRoleData') newRoleData: NewRoleInput,
  ): Promise<Role> {
    const { id } = await this.rolesService.create(newRoleData);
    const role = await this.rolesService.findRoleById(id);
    if (!role) {
      throw new NotFoundException(id);
    }
    return role;
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.delete(id);
  }
}
