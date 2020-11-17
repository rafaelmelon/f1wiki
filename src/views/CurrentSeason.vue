<template>
  <Navigation />
  <div id="app">
    <h1>Current Season Page</h1>
    <li v-for="item of currentSeason" :key="item.date">
      <p>{{ item.raceName }}</p>
    </li>
  </div>
</template>

<script>
import { useStore, mapState } from "vuex";

import Navigation from "/src/components/Navigation.vue";

export default {
  name: "Season",
  components: {
    Navigation,
  },
  computed: mapState({
    currentSeason: (state) => state.seasons.currentSeason,
  }),
  created() {
    const store = useStore();
    store.dispatch("SEASONS_GET_CURRENT_SEASON");
  },
};
</script>
