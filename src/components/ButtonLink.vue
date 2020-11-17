<template>
  <router-link class="link" :to="path">{{ text }}</router-link>
</template>

<script>
export default {
  name: "ButtonLink",
  props: {
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
  border-radius: 5px;
}
</style>
