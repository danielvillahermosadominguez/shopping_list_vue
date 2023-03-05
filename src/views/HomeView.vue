<template>
  <div class="home">
    <ShoppingList></ShoppingList>
  </div>
</template>

<script lang="ts">
import ShoppingList from '@/components/ShoppingList.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ShoppingList
      },
})
export default class HomeView extends Vue {}
</script>
