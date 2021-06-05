import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  /**
   * credentials: 'same-origin' as shown below, if your backend server is the same domain or else credentials:
   * 'include' if your backend is a different domain.
   */
  credentials: 'include',
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    // Not required as long as key field is different from id or _id.
    // Default keyField is id or _id
    typePolicies: {
      Song: {
        keyFields: ["id"]
      },
      Lyric: {
        keyFields: ["id"]
      },
      User: {
        keyFields: ["id"]
      },
    }
  })
});