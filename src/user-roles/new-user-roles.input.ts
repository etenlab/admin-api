import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewUserRoleInput {
  @Field(() => Int, { nullable: false })
  user_id: number;

  @Field(() => Int, { nullable: false })
  app: number;

  @Field(() => Int, { nullable: false })
  org: number;

  @Field(() => Int, { nullable: false })
  role: number;
}
