<template>
  <div class="race">
    <p>{{ race.date }}</p>
    <p>{{ race.raceName }}</p>
    <p>{{ race.round }}</p>
    <p>{{ race.season }}</p>
    <p>{{ race.time }}</p>
    <p>{{ race.url }}</p>
    <router-link :to="'/seasons/' + race.season + '/race/' + race.round"
      >Details</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Race",
  props: {
    race: {
      date: String,
      raceName: String,
      round: String,
      season: String,
      time: String,
      url: String,
    },
  },
};
</script>

<style scoped>
.race {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
  border-radius: 5px;
}
</style>
