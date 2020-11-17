<template>
  <header class="header">
    <h1>F1 WIKI</h1>
  </header>
  <section class="row">
    <ul>
      <li v-for="route of routes" :key="route.index">
        <ButtonLink :path="route.path" :text="route.name" />
      </li>
    </ul>
  </section>
</template>

<script>
import ButtonLink from "/src/components/ButtonLink.vue";
import { ROUTES_HOME } from "/src/constants";

export default {
  name: "Home",
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

<style scoped></style>
