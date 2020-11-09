<template>
  <Navigation />
  <div id="app">
    <h1>Seasons Page</h1>
    <SeasonList msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
import Navigation from "/src/components/Navigation.vue";
import SeasonList from "/src/components/SeasonList.vue";

export default {
  name: "Seasons",
  components: {
    Navigation,
    SeasonList,
  },
};
</script>
