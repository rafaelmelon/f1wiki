<template>
  <header class="header">
    <h1>Seasons</h1>
  </header>
  <section class="row">
    <button @click="localIncrement">Local Increment: {{ localCount }}</button>
    <ul>
      <li v-for="item of seasons" :key="item.season">
        <router-link :to="'/seasons/' + item.season">{{
          item.season
        }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { ref } from "vue";
import { useStore, mapState } from "vuex";

export default {
  name: "Seasons",
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
