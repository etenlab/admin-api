import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`app_list`, {
  schema: `admin`,
})
@ObjectType()
@Directive('@key(fields: "id")')
export class Application {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  app_name: string;
}
