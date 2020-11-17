<template>
  <header class="header">
    <h1>Current Season</h1>
  </header>
  <section class="row">
    <ul>
      <li v-for="item of currentSeason" :key="item.date">
        <Race :race="item" />
      </li>
    </ul>
  </section>
</template>

<script>
import { useStore, mapState } from "vuex";

import Race from "/src/components/Race.vue";

export default {
  name: "Current",
  components: {
    Race,
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
