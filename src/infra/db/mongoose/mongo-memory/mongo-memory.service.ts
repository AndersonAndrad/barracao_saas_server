import { connect, Connection } from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

export class MongoInMemory {
  private constructor(
    private mongoServer: MongoMemoryServer,
    private mongoConnection: Connection,
  ) {}

  static async startServer(): Promise<MongoInMemory> {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    const mongoConnection = (await connect(mongoUri)).connection;

    process.env.MONGO_URI = mongoUri;

    return new MongoInMemory(mongoServer, mongoConnection);
  }

  async shutdown() {
    await this.mongoConnection.dropDatabase();
    await this.mongoConnection.close();
    await this.mongoServer.stop();
  }

  async clearCollections() {
    const collections = this.mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
