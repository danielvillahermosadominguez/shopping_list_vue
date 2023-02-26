import Vue from 'vue';
import App from './App.vue';
import VueApollo from 'vue-apollo';
import router from './router';
import { ApolloClient, createNetworkInterface, createBatchingNetworkInterface}  from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
Vue.config.productionTip = false


// Create the network interface
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

// Create the subscription websocket client
const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
})

// Extend the network interface with the subscription client
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
)

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:3020/graphql',
  }),
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient,
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  // inject apolloProvider here like vue-router or vuex
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
