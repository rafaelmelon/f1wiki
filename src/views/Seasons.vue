<template>
  <Navigation />
  <div id="app">
    <h1>Seasons Page</h1>
    <button @click="localIncrement">Local Increment: {{ localCount }}</button>
    <ul>
      <li v-for="item of seasons" :key="item.season">
        <router-link :to="'/seasons/' + item.season">{{
          item.season
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore, mapState } from "vuex";

import Navigation from "/src/components/Navigation.vue";
import SeasonList from "/src/components/SeasonList.vue";

export default {
  name: "Seasons",
  components: {
    Navigation,
    SeasonList,
  },
  computed: mapState({
    seasons: (state) => state.seasons.all,
  }),
  created() {
    const store = useStore();
    store.dispatch("SEASONS_GET");
  },
  setup() {
    let localCount = ref(0);
    const localIncrement = () => {
      localCount.value++;
    };
    return { localCount, localIncrement };
  },
};
</script>
