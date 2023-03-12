import Vue from 'vue';
import App from './App.vue';
import ShoppingList from './components/ShoppingList.vue';
import AppService from '@/appservices/AppService';
import router from './router';
Vue.config.productionTip = false

Vue.component("ShoppingList", ShoppingList);
const appService = new AppService();


new Vue({
  // inject apolloProvider here like vue-router or vuex    
  router,
  render: h => h(App)
}).$mount('#app')