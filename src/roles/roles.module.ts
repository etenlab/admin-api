import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
