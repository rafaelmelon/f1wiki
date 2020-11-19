<template>
  <span>
    <header class="header">
      <h1>Current Season</h1>
    </header>
    <section class="container-lg">
      <TableSeason :data="currentSeason" :columns="gridColumns" />
    </section>
  </span>
</template>

<script>
import { useStore, mapState } from "vuex";

import TableSeason from "/src/components/TableSeason.vue";

export default {
  name: "Current",
  components: {
    TableSeason,
  },
  data() {
    return {
      gridColumns: ["round", "raceName", "date", "time", "url"],
    };
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
