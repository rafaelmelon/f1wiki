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
  align-items: center;
  padding: 10px;
  border: 1px solid #15151e;
  color: #15151e;
  margin: 5px;
  border-radius: 5px;
  justify-content: center;
}
</style>
