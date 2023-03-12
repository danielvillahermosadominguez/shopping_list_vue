import Vue from 'vue';
import App from './App.vue';
import ShoppingList from './components/ShoppingList.vue';
import router from './router';
Vue.config.productionTip = false

Vue.component("ShoppingList", ShoppingList);

new Vue({
  // inject apolloProvider here like vue-router or vuex    
  router,
  render: h => h(App)
}).$mount('#app')