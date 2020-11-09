<template>
  <div id="app">
    <h1>Home Page</h1>
    <div id="nav">
      <ul>
        <li v-for="route of routes" :key="route.index">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ROUTES } from "/src/constants";

export default {
  name: "Home",
  data() {
    return {
      routes: ROUTES,
    };
  },
};
</script>
