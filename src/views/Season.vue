<template>
  <span>
    <header class="header">
      <h1>Season {{ $route.params.season }}</h1>
    </header>
    <section class="container-lg">
      <TableSeason :data="season" :columns="gridColumns" />
    </section>
  </span>
</template>

<script>
import { useStore, mapState } from "vuex";

import TableSeason from "/src/components/TableSeason.vue";

export default {
  name: "Season",
  components: {
    TableSeason,
  },
  data() {
    return {
      gridColumns: ["round", "raceName", "date", "time", "url"],
    };
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
