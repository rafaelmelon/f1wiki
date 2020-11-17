<template>
  <header class="header">
    <h1>Race</h1>
  </header>
  <section class="row">
    <ul>
      <li v-for="item of raceResults" :key="item.number">
        <p>{{ item.number }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import { useStore, mapState } from "vuex";

export default {
  name: "Race",
  computed: mapState({
    raceResults: (state) => state.races.raceResults.Results,
  }),
  created() {
    const store = useStore();
    const { season, round } = this.$route.params;

    store.dispatch("RACES_GET_RACE_RESULTS", { season, round });
  },
};
</script>

<style scoped></style>
