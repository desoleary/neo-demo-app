import { ApolloServer } from 'apollo-server';
import { connectDB } from '../config/db';
import typeDefs from './schema';
import resolvers from './resolvers';

export const createApolloServer = () =>
  new ApolloServer({ typeDefs, resolvers, context: () => ({}) });

const startServer = async () => {
  await connectDB();
  const server = createApolloServer();
  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`Server ready at ${url}`);
};

if (require.main === module) {
  startServer().catch((err) => {
    console.error('Server failed to start', err);
  });
}
