import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/utils/setupSwagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './common/config/app.config';
import { ConfigNames } from './common/types/configNames';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = configService.get<AppConfig>(ConfigNames.APP);

  if (!config) {
    throw new Error('App config does not exists');
  }

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    // origin: true,
  });

  setupSwagger(app);

  await app.listen(config.port);
}
bootstrap();
