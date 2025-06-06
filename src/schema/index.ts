import { gql } from 'apollo-server';
import { GraphQLJSON } from 'graphql-type-json';

const typeDefs = gql`
  scalar JSON
  type User {
    id: ID!
    name: String!
    email: String!
    preferences: JSON
  }

  type Account {
    id: ID!
    user: User!
    balance: Float!
  }

  type Merchant {
    id: ID!
    name: String!
  }

  type RewardCampaign {
    id: ID!
    name: String!
    rewardRate: Float!
  }

  type Transaction {
    id: ID!
    account: Account!
    merchant: Merchant!
    amount: Float!
    rewardsEarned: Float!
  }

  type LoyaltyTier {
    id: ID!
    name: String!
    threshold: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    accounts: [Account!]!
    account(id: ID!): Account
    merchants: [Merchant!]!
    merchant(id: ID!): Merchant
    rewardCampaigns: [RewardCampaign!]!
    rewardCampaign(id: ID!): RewardCampaign
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
  }

  type Mutation {
    createUser(name: String!, email: String!, preferences: JSON): User!
    createAccount(userId: ID!, balance: Float): Account!
    createMerchant(name: String!): Merchant!
    createRewardCampaign(name: String!, rewardRate: Float!): RewardCampaign!
    createTransaction(accountId: ID!, merchantId: ID!, amount: Float!): Transaction!
  }
`;

export default typeDefs;
