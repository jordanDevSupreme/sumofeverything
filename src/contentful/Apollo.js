import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

const httpLink = createHttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/x3dxoa17fvp4',
  headers: {
    Authorization: 'Bearer MBxLi24ULAn3KWPzMiSsS_Ez-RdxBgI6IkMbRt_O3Gs',
  },
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
