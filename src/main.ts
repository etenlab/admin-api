import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/configuration';

const PORT = config().port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://showcase.dev.lab.eten.bible'],
  });
  await app.listen(PORT);
}
bootstrap();
