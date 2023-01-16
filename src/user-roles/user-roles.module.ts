import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesResolver } from './/user-roles.resolver';
import { UserRolesService } from './user-roles.service';
import { UserRole } from './user-roles.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRolesResolver, UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
