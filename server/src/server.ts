import "reflect-metadata";
import MongoStore from 'connect-mongo';
import { dbConnect, MONGO_URI } from './db_conn';
import { createApolloServer } from "./apollo";

import { GraphQLLocalStrategy } from 'graphql-passport';
import { User, UserModel } from './entities/User';
import { ERRORS } from './enums/error';

const Express = require('express');
const session = require('express-session');
const passport = require('passport');

const main = async () => {

  await dbConnect();

  const app = Express();

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    })
  }));

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

  app.use(passport.initialize());
  app.use(passport.session());

  const apolloServer = await createApolloServer();

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    cors: { credentials: true, origin: true },
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


