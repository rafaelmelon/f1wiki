<template>
  <NavBar />
  <main>
    <router-view />
  </main>
</template>

<script>
import NavBar from "/src/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: lightcoral;
  color: white;
}

.row {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
}
</style>
