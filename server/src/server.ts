import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from "typedi";
import "reflect-metadata";
import { connect } from "mongoose";
import { SongResolver } from './resolvers/SongResolver';
import { LyricResolver } from './resolvers/LyricResolver';

const Express = require('express');

const MONGO_URI = `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0wqvx.mongodb.net/test?retryWrites=true&w=majority`;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      SongResolver,
      LyricResolver,
    ],
    container: Container,
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect(MONGO_URI, { useNewUrlParser: true });
  await mongoose.connection;

  const server: ApolloServer = new ApolloServer({ schema });
  const app = Express();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
}

try {
  main();
} catch (error) {
  console.log(error, 'error');
}


