<template>
  <NavBar />
  <div id="app">
    <h1>Season Page {{ $route.params.season }}</h1>
    <p>Year {{ season.season }}</p>
    <p>Wiki {{ season.url }}</p>
  </div>
</template>

<script>
import { useStore, mapState } from "vuex";

import NavBar from "/src/components/NavBar.vue";

export default {
  name: "Season",
  components: {
    NavBar,
  },
  computed: mapState({
    season: (state) => state.seasons.season,
  }),
  created() {
    const store = useStore();
    store.dispatch("SEASONS_GET_SEASON", this.$route.params.season);
  },
};
</script>
