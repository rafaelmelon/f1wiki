<template>
  <header class="header">
    <h1>Current Season</h1>
  </header>
  <section class="row">
    <Table
      :data="currentSeason"
      :columns="gridColumns"
      :filter-key="searchQuery"
    />
  </section>
</template>

<script>
import { useStore, mapState } from "vuex";

import Table from "/src/components/Table.vue";

export default {
  name: "Current",
  components: {
    Table,
  },
  data() {
    return {
      gridColumns: ["date", "raceName", "round", "season", "time", "url"],
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
