import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModuleConfiguration } from './infra/db/mongoose/mongoose.module';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './core/configuration/configuration';
import { UserModule } from './application/user/user.module';
import { InventoryModule } from './application/inventory/inventory.module';
import { InventoryStockHistoryModule } from './application/inventory-stock-history/inventory-stock-history.module';
import { BillModule } from './application/bill/bill.module';

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
    InventoryModule,
    InventoryStockHistoryModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
