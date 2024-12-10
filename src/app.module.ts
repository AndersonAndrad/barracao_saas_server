import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModuleConfiguration } from './infra/db/mongoose/mongoose.module';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './core/configuration/configuration';
import { UserModule } from './application/user/user.module';

@Module({
  imports: [
    MongooseModuleConfiguration,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'variaveis.ini'],
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    // Application modules
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
