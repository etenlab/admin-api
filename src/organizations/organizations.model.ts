import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`organizations`, {
  schema: `admin`,
})
@ObjectType()
@Directive('@key(fields: "id")')
export class Organization {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;
}
