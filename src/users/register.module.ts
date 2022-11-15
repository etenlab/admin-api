import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class RegisterModule {
  constructor(private configService: ConfigService) {}
}
