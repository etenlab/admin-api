import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewUserInput {
  @Field({ nullable: false })
  active: boolean;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  is_email_verified: boolean;

  @Field({ nullable: false })
  password: string;
}
