<template>
  <nav class="nav">
    <div class="nav__logo">
      <router-link to="/"
        ><img src="../assets/logo.png" alt="logo"
      /></router-link>
    </div>
    <div class="nav__routes">
      <ul>
        <li v-for="route of routes" :key="route.index">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ROUTES_HOME } from "/src/constants";

export default {
  name: "NavBar",
  data() {
    return {
      routes: ROUTES_HOME,
    };
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid black;
}
.nav__logo img {
  width: 100px;
}
.nav__routes ul {
  flex-direction: row;
  display: flex;
}
.nav__routes ul a {
  padding: 5px;
  margin: 5px;
  border: 1px solid black;
}
</style>
