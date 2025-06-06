import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import Account from '../src/models/Account';
import Merchant from '../src/models/Merchant';
import RewardCampaign from '../src/models/RewardCampaign';
import Transaction from '../src/models/Transaction';
import LoyaltyTier from '../src/models/LoyaltyTier';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neo_rewards_demo';

const seed = async () => {
  await mongoose.connect(MONGODB_URI);

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Account.deleteMany({}),
    Merchant.deleteMany({}),
    RewardCampaign.deleteMany({}),
    Transaction.deleteMany({}),
    LoyaltyTier.deleteMany({}),
  ]);

  const user = await User.create({ name: 'Test User', email: 'test@example.com' });
  const account = await Account.create({ user: user._id, balance: 100 });
  const merchant = await Merchant.create({ name: 'Test Merchant' });
  const campaign = await RewardCampaign.create({ name: 'Basic Cashback', rewardRate: 0.01 });
  await LoyaltyTier.create({ name: 'Silver', threshold: 0 });
  await Transaction.create({ account: account._id, merchant: merchant._id, amount: 50, rewardsEarned: 0.5 });

  console.log('Database seeded');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seeding error', err);
  process.exit(1);
});
