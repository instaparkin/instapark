//@ts-nocheck
import "dotenv/config";
import { ApolloServer } from '@apollo/server';
import { GraphQLSchema } from 'graphql';
import { RootQuery } from './queries/root.graphql.query';
import { RootMutation } from './mutations/root.graphql.mutation';
import express from "express"
import cors from "cors";
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ensureSuperTokensInit, errorHandler, middleware, supertokens } from '@instapark/auth';

const PORT = process.env.PORT || 4000

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

async function init() {
  ensureSuperTokensInit();

  const app = express();

  app.use(express.json());

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  }));

  app.use(middleware());

  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server),
  );

  app.use(errorHandler());

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  })
}

init();