import { Logger, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';

import { DataOptions } from './mongoose.options';
import mongoose from 'mongoose';

@Module({ providers: [DataOptions] })
export class MongooseModuleConfiguration implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger('MongooseDb');

  constructor(private options: DataOptions) {}

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
      })
      .then(() => this.logger.verbose('MongooseDb connected successfully.'))
      .catch((err) => this.logger.error(err.message));
  }
}
