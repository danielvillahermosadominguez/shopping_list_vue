<template>
  <div class="home">
    <ShoppingList :appService="appService"></ShoppingList>
  </div>
</template>

<script lang="ts">

import AppService from '@/appservices/AppService';
import ShoppingList from '@/components/ShoppingList.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ShoppingList
  },
})
export default class HomeView extends Vue {

  public appService = new AppService();
}
</script>
