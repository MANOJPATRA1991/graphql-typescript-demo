import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import "reflect-metadata";
import { buildContext } from "graphql-passport";
import { SongResolver } from "./resolvers/SongResolver";
import { LyricResolver } from "./resolvers/LyricResolver";
import { ContextParams } from "graphql-passport/lib/buildContext";
import { UserResolver } from "./resolvers/UserResolver";

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [SongResolver, LyricResolver, UserResolver],
    container: Container,
    emitSchemaFile: true,
    validate: false,
  });

  const server: ApolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: ContextParams) => buildContext({ req, res }),
    formatError: (err) => {
      if (
        err.message.includes(
          "Cannot return null for non-nullable field Query.user"
        )
      ) {
        return { message: "No active user found" };
      }
      return err;
    },
  });

  return server;
};
