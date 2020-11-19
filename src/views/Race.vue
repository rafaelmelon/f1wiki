<template>
  <span>
    <header class="header">
      <h1>{{ race.raceName }} {{ race.season }}</h1>
    </header>
    <section class="column">
      <div>
        <p>{{ race.date }}</p>
        <p>{{ race.raceName }}</p>
        <p>{{ race.round }}</p>
        <p>{{ race.season }}</p>
        <p>{{ race.time }}</p>
        <p>{{ race.url }}</p>
      </div>
      <div>
        <Table :data="race.Results" :columns="gridColumns" />
      </div>
    </section>
  </span>
</template>

<script>
import { useStore, mapState } from "vuex";

import Table from "/src/components/Table.vue";

export default {
  name: "Race",
  components: {
    Table,
  },
  data() {
    return {
      gridColumns: ["number", "grid", "laps", "points", "position", "status"],
    };
  },
  computed: mapState({
    race: (state) => state.races.race,
  }),
  created() {
    const store = useStore();
    const { season, round } = this.$route.params;

    store.dispatch("RACES_GET_RACE_RESULTS", { season, round });
  },
};
</script>

<style scoped></style>
