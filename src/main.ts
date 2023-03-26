import Vue from 'vue';
import App from './App.vue';
import ShoppingList from './components/ShoppingList.vue';
import router from './router';
import i18n from './i18n'
Vue.config.productionTip = false

Vue.component("ShoppingList", ShoppingList);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')