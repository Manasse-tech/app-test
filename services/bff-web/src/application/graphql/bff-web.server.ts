import { ApolloServer } from '@apollo/server';
const typeDefs = `#graphql type Query { health: String }`;
const resolvers = { Query: { health: (): string => 'BFF operational' } };
export const server = new ApolloServer({ typeDefs, resolvers });
