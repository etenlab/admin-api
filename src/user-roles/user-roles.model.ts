import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/users.model';
import { Organization } from 'src/organizations/organizations.model';
import { Application } from 'src/applications/applications.model';
import { Role } from 'src/roles/roles.model';

@Entity(`user_roles`, {
  schema: `admin`,
})
@ObjectType()
@Directive('@key(fields: "id")')
export class UserRole {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: 0 })
  @Field(() => Int)
  user_id: number;

  @Column({ default: 0 })
  @Field(() => Int)
  org: number;

  @Column({ default: 0 })
  @Field(() => Int)
  app: number;

  @Column()
  @Field(() => Int)
  role: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.user_id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Field(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'org',
  })
  organization: Organization;

  @Field(() => Application)
  @OneToOne(() => Application, (application) => application.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id',
  })
  application: Application;

  @Field(() => Role)
  @OneToOne(() => Role, (role) => role.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id',
  })
  userRole: Role;
}
