import Vue from 'vue';
import App from './App.vue';
import ShoppingList from './components/ShoppingList.vue';
import router from './router';
Vue.config.productionTip = false

Vue.component("ShoppingList", ShoppingList);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')