<template>
  <h1>{{ msg }}</h1>
  <button @click="localIncrement">Local Increment: {{ localCount }}</button>
  <button @click="increment">Increment: {{ count }}</button>
  <button @click="decrement">Decrement: {{ count }}</button>
  <ul>
    <li v-for="season of seasons" :key="season.season">
      {{ season.season }}
    </li>
  </ul>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { ref, computed } from "vue";
import { useStore, mapState } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: mapState({
    seasons: (state) => state.seasons.all,
  }),
  created() {
    const store = useStore();
    store.dispatch("SEASONS_GET");
  },
  setup() {
    const store = useStore();
    let count = computed(() => store.state.count);

    let localCount = ref(0);

    const localIncrement = () => {
      localCount.value++;
    };

    const increment = () => {
      store.commit("INCREMENT");
    };

    const decrement = () => {
      store.commit("DECREMENT");
    };

    console.log("HELLO")

    return { localCount, count, localIncrement, increment, decrement };
  },
};
</script>
