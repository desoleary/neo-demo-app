import mongoose from 'mongoose';
import dotenv from 'dotenv';

const getEnvFile = () => {
  if (process.env.NODE_ENV === 'test') return '.env.test';
  if (process.env.NODE_ENV === 'production') return '.env.production';
  return '.env';
};

const getMongoUri = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return (
      process.env.MONGODB_URI_TEST ||
      'mongodb://localhost:27017/neo_rewards_demo_test'
    );
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.MONGODB_URI_PROD || '';
  }
  return (
    process.env.MONGODB_URI || 'mongodb://localhost:27017/neo_rewards_demo'
  );
};

export const connectToDatabase = async () => {
  dotenv.config({ path: getEnvFile() });
  const uri = getMongoUri();
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected to ${uri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
