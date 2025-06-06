import { beforeAll, afterAll, afterEach } from 'vitest';
import mongoose from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { createApolloServer } from '../src/index';
import { connectDB } from '../config/db';
import User from '../src/models/User';
import Account from '../src/models/Account';
import Merchant from '../src/models/Merchant';
import RewardCampaign from '../src/models/RewardCampaign';
import Transaction from '../src/models/Transaction';

dotenv.config({ path: '.env.test' });

let request: supertest.SuperTest<supertest.Test>;
let apollo: ReturnType<typeof createApolloServer>;
let httpServer: any;

beforeAll(async () => {
  await connectDB();
  apollo = createApolloServer();
  const info = await apollo.listen({ port: 0 });
  httpServer = info.server;
  request = supertest(httpServer);
});

afterAll(async () => {
  await apollo.stop();
  await mongoose.connection.close();
  await httpServer.close();
});

afterEach(async () => {
  await Promise.all([
    User.deleteMany({}),
    Account.deleteMany({}),
    Merchant.deleteMany({}),
    RewardCampaign.deleteMany({}),
    Transaction.deleteMany({}),
  ]);
});

export { request };
