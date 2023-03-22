<template>
  <div class="home">
    <ShoppingList :appService="appService"></ShoppingList>
  </div>
</template>

<script lang="ts">

import AppService from '@/appservices/AppService';
import ShoppingList from '@/components/ShoppingList.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ShoppingList
  },
})
export default class HomeView extends Vue {
  @Prop() appService!: AppService;
}
</script>
