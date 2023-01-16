import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsResolver } from './applications.resolver';
import { ApplicationsService } from './applications.service';
import { Application } from './applications.model';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationsResolver, ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
