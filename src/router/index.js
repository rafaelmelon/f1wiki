import { createWebHistory, createRouter } from "vue-router";

import Home from "/src/views/Home.vue";
import Seasons from "/src/views/Seasons.vue";
import Season from "/src/views/Season.vue";
import Drivers from "/src/views/Drivers.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/seasons",
    name: "Seasons",
    component: Seasons,
  },
  { path: "/seasons/:id", name: "Season", component: Season },
  {
    path: "/drivers",
    name: "Drivers",
    component: Drivers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
