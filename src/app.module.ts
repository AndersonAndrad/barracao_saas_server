import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './application/bill/bill.module';
import { InventoryStockHistoryModule } from './application/inventory-stock-history/inventory-stock-history.module';
import { InventoryModule } from './application/inventory/inventory.module';
import { MonthlyFeeModule } from './application/monthlyFee/monthlyFee.module';
import { UserModule } from './application/user/user.module';
import configuration from './core/configuration/configuration';
import { MongooseModuleConfiguration } from './infra/db/mongoose/mongoose.module';

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
    MonthlyFeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
