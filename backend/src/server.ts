import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { resolvers } from './models/resolvers';
import { typeDefs } from './models/typeDefs';
import { app } from './app';

require('dotenv').config();

/**
 * Starts Apollo Server and connects to MongoDB database.
 */
const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });
  await mongoose.connect(
    `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}`,
    {
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
    }
  );

  app.listen({ port: 4001 }, () => {
    console.log(`http://localhost:4001${server.graphqlPath}`);
  });
};

startServer();
