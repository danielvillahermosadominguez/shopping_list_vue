
import ShoppingList from './components/ShoppingList.vue';

<template>
  <div id="app">
    <div class="nav__end">
      <LocaleSwitcher />
    </div>
    <nav>
      <router-link to="/">{{$t("app-home")}}</router-link> |
      <router-link to="/about">{{$t("app-about")}}</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher"
export default {
  components: { LocaleSwitcher }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.nav__start,
.nav__end {
  display: flex;
  align-items: center;
}
.nav img {
  margin-right: 1rem;
}
</style>
