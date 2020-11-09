<template>
  <Navigation />
  <div id="app">
    <h1>Season Page {{ $route.params.id }}</h1>
    <p>Year {{ season.season }}</p>
    <p>Wiki {{ season.url }}</p>
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
    season: (state) => state.seasons.season,
  }),
  created() {
    const store = useStore();
    store.dispatch("SEASONS_GET_SEASON", this.$route.params.id);
  },
};
</script>
