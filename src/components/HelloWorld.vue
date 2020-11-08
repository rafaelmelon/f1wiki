<template>
  <h1>{{ msg }}</h1>
  <button @click="localIncrement">Local Increment: {{ localCount }}</button>
  <button @click="increment">Increment: {{ count }}</button>
  <button @click="decrement">Decrement: {{ count }}</button>
  <ul>
    <li v-for="driver of drivers" :key="driver.driverId">
      {{ driver.familyName }}
    </li>
  </ul>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      drivers: [],
    };
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

    return { localCount, count, localIncrement, increment, decrement };
  },
  async created() {
    const response = await fetch("http://ergast.com/api/f1/drivers.json");
    const data = await response.json();
    this.drivers = data.MRData.DriverTable.Drivers;
  },
};
</script>
