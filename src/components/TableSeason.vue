<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns">
          {{ capitalize(key) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in data">
        <td v-for="key in columns">
          <a v-if="key === 'url'" :href="entry[key]" target="_blank"
            >Wikipedia</a
          >
          <p v-else-if="key === 'time'">{{ getTime(entry, key) }}</p>
          <ButtonLink
            v-else-if="key === 'round'"
            :path="'/seasons/'+ entry.season +'/race/' + entry[key]"
            :text="entry[key]"
          />
          <ButtonLink
            v-else-if="key === 'season'"
            :path="'/seasons/' + entry[key]"
            :text="entry[key]"
          />
          <p v-else>{{ entry[key] }}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from "moment";

import ButtonLink from "/src/components/ButtonLink.vue";

export default {
  name: "TableSeason",
  components: {
    ButtonLink,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    capitalize(key) {
      return key.charAt(0).toUpperCase() + key.slice(1);
    },
    getTime(entry, key) {
      const time = entry[key];
      return moment(time, "HH:mm:ss").format("HH:mm");
    },
  },
};
</script>

<style scoped></style>
