import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewOrganizationInput {
  @Field({ nullable: false })
  name: string;
}
