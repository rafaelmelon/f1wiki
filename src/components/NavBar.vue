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
          <ButtonLink :path="route.path" :text="route.name" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ROUTES_HOME } from "/src/constants";
import ButtonLink from "/src/components/ButtonLink.vue";

export default {
  name: "NavBar",
  components: {
    ButtonLink,
  },
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
</style>
