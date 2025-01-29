import { Logger, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';

import mongoose from 'mongoose';
import { DataOptions } from './mongoose.options';
import { MonthlyFeeModel } from './schemas/monthlyFee.schema';
import { UserModel } from './schemas/user.schema';

@Module({ providers: [DataOptions] })
export class MongooseModuleConfiguration implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger('MongooseDb');

  constructor(private options: DataOptions) { }

  async onApplicationShutdown() {
    await mongoose.disconnect();
  }

  async onApplicationBootstrap() {
    mongoose.set('runValidators', true);

    await mongoose
      .connect(this.options.uri, {
        maxPoolSize: 1000,
        minPoolSize: 100,
        maxIdleTimeMS: 30000,
        autoIndex: true,
      })
      .then(async () => {
        this.logger.verbose(`MongooseDb connected successfully: ${this.options.uri}`);

        await this.syncIndexes();
      })
      .catch((err) => {
        this.logger.error(`MongooseDb connection error: ${err.message}: ${this.options.uri}`);
      });
  }

  private async syncIndexes(): Promise<void> {
    const models = [UserModel, MonthlyFeeModel];

    const results = await Promise.allSettled(
      models.map(async (model) => {
        try {
          await model.syncIndexes();
        } catch (error) {
          throw error;
        }
      }),
    );

    results.forEach((result, index) => {
      const modelName = models[index].modelName;
      if (result.status === 'fulfilled') {
        this.logger.verbose(`${modelName}: Indexes synced successfully`);
      } else {
        this.logger.error(`${modelName}: Failed to sync indexes - ${result.reason}`);
      }
    });
  }
}
