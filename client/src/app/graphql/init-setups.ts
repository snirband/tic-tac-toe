import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export function createApolloClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql', // Adjust to your backend URL
  });

  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:3000/graphql', // Same here
  }));

  // Split links based on operation type: subscription goes to wsLink, others to httpLink
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}
