import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewApplicationInput {
  @Field({ nullable: false })
  app_name: string;
}
