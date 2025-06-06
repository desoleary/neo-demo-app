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
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default typeDefs;
