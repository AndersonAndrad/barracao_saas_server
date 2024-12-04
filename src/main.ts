import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerConfig from './infra/swagger/swagger.config';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('InstanceLoader');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port') || 3000;

  logger.debug(`Application run in port ${port}`);

  swaggerConfig.initSwagger(app);

  app.enableCors();

  await app.listen(port);
}

bootstrap();
