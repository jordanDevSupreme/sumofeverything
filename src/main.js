import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { ApolloProvider, provideApolloClient } from '@vue/apollo-composable';
import router from './router';
import axios from 'axios';
import './assets/global.css'
const httpLink = createHttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/x3dxoa17fvp4',
  headers: {
    Authorization: 'Bearer MBxLi24ULAn3KWPzMiSsS_Ez-RdxBgI6IkMbRt_O3Gs',
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const app = createApp(App);

// Use ApolloProvider to wrap the entire application
app.use(ApolloProvider, provideApolloClient(apolloClient));
app.config.globalProperties.$axios = axios;
app.use(router);

app.mount('#app');
