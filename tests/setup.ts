import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApolloServer } from '../src/index';
import { connectToDatabase } from '../config/db';
import User from '../src/models/User';
import Account from '../src/models/Account';
import Merchant from '../src/models/Merchant';
import RewardCampaign from '../src/models/RewardCampaign';
import Transaction from '../src/models/Transaction';

process.env.NODE_ENV = 'test';

let request: supertest.SuperTest<supertest.Test>;
let apollo: ReturnType<typeof createApolloServer>;
let httpServer: any;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI_TEST = mongoServer.getUri();
  await connectToDatabase();
  apollo = createApolloServer();
  const info = await apollo.listen({ port: 0 });
  httpServer = info.server;
  request = supertest(httpServer);
});

afterAll(async () => {
  await apollo.stop();
  await mongoose.connection.close();
  await httpServer.close();
  await mongoServer.stop();
});

const clearDatabase = async () => {
  await Promise.all([
    User.deleteMany({}),
    Account.deleteMany({}),
    Merchant.deleteMany({}),
    RewardCampaign.deleteMany({}),
    Transaction.deleteMany({}),
  ]);
};

beforeEach(async () => {
  await clearDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

export { request };
