import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`roles`, {
  schema: `admin`,
})
@ObjectType()
@Directive('@key(fields: "id")')
export class Role {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: 0 })
  @Field(() => Int)
  organization: number;

  @Column()
  @Field(() => String)
  name: string;
}
