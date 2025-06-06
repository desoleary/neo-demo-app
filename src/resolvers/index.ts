import { GraphQLJSON } from 'graphql-type-json';
import User from '../models/User';
import Account from '../models/Account';
import Merchant from '../models/Merchant';
import RewardCampaign from '../models/RewardCampaign';
import Transaction from '../models/Transaction';
import { calculateRewards } from '../services/rewardService';

export default {
  JSON: GraphQLJSON,
  Query: {
    users: () => User.find(),
    user: (_: unknown, { id }: { id: string }) => User.findById(id),
    accounts: () => Account.find(),
    account: (_: unknown, { id }: { id: string }) => Account.findById(id),
    merchants: () => Merchant.find(),
    merchant: (_: unknown, { id }: { id: string }) => Merchant.findById(id),
    rewardCampaigns: () => RewardCampaign.find(),
    rewardCampaign: (_: unknown, { id }: { id: string }) => RewardCampaign.findById(id),
    transactions: () => Transaction.find(),
    transaction: (_: unknown, { id }: { id: string }) => Transaction.findById(id),
  },
  Mutation: {
    createUser: (_: unknown, args: { name: string; email: string; preferences?: Record<string, unknown> }) =>
      User.create(args),
    createAccount: (_: unknown, { userId, balance }: { userId: string; balance?: number }) =>
      Account.create({ user: userId, balance }),
    createMerchant: (_: unknown, { name }: { name: string }) => Merchant.create({ name }),
    createRewardCampaign: (_: unknown, { name, rewardRate }: { name: string; rewardRate: number }) =>
      RewardCampaign.create({ name, rewardRate }),
    createTransaction: async (
      _: unknown,
      { accountId, merchantId, amount }: { accountId: string; merchantId: string; amount: number }
    ) => {
      const rewardsEarned = calculateRewards(amount, 0.01);
      return Transaction.create({ account: accountId, merchant: merchantId, amount, rewardsEarned });
    },
  },
};
