import { NotFoundException, Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { UserRole } from './user-roles.model';
import { UserRolesService } from './user-roles.service';
import { NewUserRoleInput } from './new-user-roles.input';

@Resolver(() => UserRole)
@Injectable()
export class UserRolesResolver {
  static userRole: any;
  constructor(private readonly userRolesService: UserRolesService) {}

  @Query(() => [UserRole])
  async userRoles(
    @Args('user_id', { nullable: true, type: () => Int }) user_id?: number,
  ): Promise<UserRole[]> {
    let userRoles = [];
    if (user_id) {
      userRoles = await this.userRolesService.getUserRolesByUserId(user_id);
    } else {
      userRoles = await this.userRolesService.list();
    }

    if (!userRoles) {
      return [];
    }
    return userRoles;
  }

  @Query(() => UserRole)
  async userRole(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserRole> {
    return await this.userRolesService.findUserRoleById(id);
  }

  @Mutation(() => UserRole)
  async createUserRole(
    @Args('newUserRoleData') newUserRoleData: NewUserRoleInput,
  ): Promise<UserRole> {
    console.log(newUserRoleData);
    const roleExists = await this.userRolesService.checkUserExists(
      newUserRoleData,
    );
    if (!roleExists) {
      const { id } = await this.userRolesService.create(newUserRoleData);
      const userRole = await this.userRolesService.findUserRoleById(id);
      if (!userRole) {
        throw new NotFoundException(id);
      }
      return userRole;
    }
    console.log(roleExists);
    return roleExists;
  }

  @Mutation(() => UserRole)
  async updateUserRole(
    @Args('id') id: number,
    @Args('newUserRoleData') newUserRoleData: NewUserRoleInput,
  ): Promise<boolean> {
    console.log(newUserRoleData);
    const roleExists = await this.userRolesService.checkUserExists(
      newUserRoleData,
    );
    if (!roleExists) {
      const updated = await this.userRolesService.update(id, newUserRoleData);
      if (!updated) {
        throw new NotFoundException(id);
      }
      return updated;
    }
    console.log(roleExists);
    return false;
  }

  @Mutation(() => Boolean)
  async deleteUserRole(@Args('id', { type: () => Int }) id: number) {
    return this.userRolesService.delete(id);
  }
}
