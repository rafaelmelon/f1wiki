<template>
  <span>
    <header class="header">
      <h1>Seasons</h1>
    </header>
    <section class="container-lg">
      <TableSeason :data="seasons" :columns="gridColumns" />
    </section>
  </span>
</template>

<script>
import { ref } from "vue";
import { useStore, mapState } from "vuex";

import TableSeason from "/src/components/TableSeason.vue";

export default {
  name: "Seasons",
  components: {
    TableSeason,
  },
  data() {
    return {
      gridColumns: ["season", "url"],
    };
  },
  computed: mapState({
    seasons: (state) => state.seasons.all,
  }),
  created() {
    const store = useStore();
    store.dispatch("SEASONS_GET");
  },
};
</script>
