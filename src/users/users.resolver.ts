import { NotFoundException, Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';
import { NewUserInput } from './new-user.input';

@Resolver(() => User)
@Injectable()
export class UsersResolver {
  static user: any;
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.list();
    if (!users) {
      return [];
    }
    return users;
  }

  @Query(() => User)
  async user(
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<User> {
    const user = await this.usersService.findUserById(user_id);
    if (!user) {
      throw new NotFoundException(user_id);
    }
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    const { user_id } = await this.usersService.create(newUserData);
    const user = await this.usersService.findUserById(user_id);
    if (!user) {
      throw new NotFoundException(user_id);
    }
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('user_id', { type: () => Int }) user_id: number) {
    return this.usersService.delete(user_id);
  }
}
