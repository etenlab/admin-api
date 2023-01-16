import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewRoleInput {
  @Field(() => Int, { nullable: true })
  organization: number;

  @Field({ nullable: false })
  name: string;
}
