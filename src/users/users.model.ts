import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`users`, {
  schema: `admin`,
})
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => Boolean)
  active: boolean;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  @Field(() => Boolean)
  is_email_verified: boolean;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ default: 0 })
  @Field(() => Int)
  created_at: number;
}
