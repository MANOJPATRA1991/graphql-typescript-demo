import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from "typedi";
import "reflect-metadata";
import { connect } from "mongoose";
import MongoStore from 'connect-mongo';
import { buildContext, GraphQLLocalStrategy } from 'graphql-passport';
import { SongResolver } from './resolvers/SongResolver';
import { LyricResolver } from './resolvers/LyricResolver';
import { User, UserModel } from './entities/User';
import { ContextParams } from 'graphql-passport/lib/buildContext';
import { UserResolver } from './resolvers/UserResolver';
import { ERRORS } from './enums/error';

const session = require('express-session');
const passport = require('passport');
const Express = require('express');

const MONGO_URI = `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.0wqvx.mongodb.net/test?retryWrites=true&w=majority`;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      SongResolver,
      LyricResolver,
      UserResolver,
    ],
    container: Container,
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect(MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
  await mongoose.connection;

  passport.serializeUser((user: User, done: Function) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: any, done: Function) => {
    let user = null;
    let err = null;
    try {
      user = await UserModel.findById(id);
    } catch(e) {
      err = e;
    } finally {
      done(err, user);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (email: any, password: any, done: Function) => {
      try {
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
          done(new Error(ERRORS.NO_MATCHING_USER), user);
        }
        const isMatch = await user?.comparePassword(password);
        done(isMatch ? null : new Error(ERRORS.INVALID_CREDENTIALS), user);
      } catch (err) {
        done(err);
      }
    })
  );

  const app = Express();
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  const server: ApolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: ContextParams) => buildContext({ req, res }),
    formatError: (err) => {
      if (err.message.includes("Cannot return null for non-nullable field Query.user")) {
        return { message: 'No active user found' };
      }
      return err;
    },
  });
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: { credentials: true, origin: true }
  });

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
}

try {
  main();
} catch (error) {
  console.log(error, 'error');
}


