import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerConfig from './infra/swagger/swagger.config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';

async function bootstrap() {
  const logger = new Logger('InstanceLoader');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port') || 3000;

  logger.debug(`Application run in port ${port}`);

  swaggerConfig.initSwagger(app);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  /**
   * @todo -
   */
  app.use(json({ limit: '10mb' }));

  await app.listen(port);
}

bootstrap();
