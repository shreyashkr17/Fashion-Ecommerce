import { withApollo } from 'next-apollo';
import { ApolloClient,  InMemoryCache } from '@apollo/client';

const API_URI = `https://graphql.iretiensemble.com//graphql`;

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  };

const apolloClient = new ApolloClient( {
    uri: API_URI,
    cache: new InMemoryCache(),
    name: 'react-web-client',
    version: '1.3',
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
} );

export default withApollo( apolloClient );