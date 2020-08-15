import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    me: User
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { user }) => user,
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});
