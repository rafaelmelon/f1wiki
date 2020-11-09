<template>
  <div id="nav">
    <ul>
      <li v-for="route of routes" :key="route.index">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ROUTES_HOME } from "/src/constants";

export default {
  name: "Navigation",
  data() {
    return {
      routes: ROUTES_HOME,
    };
  },
};
</script>
