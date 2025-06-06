import User, { IUser } from '../src/models/User';
import Account, { IAccount } from '../src/models/Account';
import Merchant, { IMerchant } from '../src/models/Merchant';
import RewardCampaign, { IRewardCampaign } from '../src/models/RewardCampaign';
import Transaction, { ITransaction } from '../src/models/Transaction';

export const createUser = (overrides: Partial<IUser> = {}) =>
  User.create({ name: 'Test User', email: `user-${Date.now()}@example.com`, ...overrides });

export const createAccount = (userId: string, overrides: Partial<IAccount> = {}) =>
  Account.create({ user: userId, balance: 0, ...overrides });

export const createMerchant = (overrides: Partial<IMerchant> = {}) =>
  Merchant.create({ name: 'Test Merchant', ...overrides });

export const createRewardCampaign = (overrides: Partial<IRewardCampaign> = {}) =>
  RewardCampaign.create({ name: 'Basic', rewardRate: 0.01, ...overrides });

export const createTransaction = (
  accountId: string,
  merchantId: string,
  overrides: Partial<ITransaction> = {}
) =>
  Transaction.create({ account: accountId, merchant: merchantId, amount: 10, rewardsEarned: 0.1, ...overrides });
