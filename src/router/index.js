import { createWebHistory, createRouter } from "vue-router";

import Home from "/src/views/Home.vue";
import Current from "/src/views/Current.vue";
import Seasons from "/src/views/Seasons.vue";
import Season from "/src/components/Season.vue";
import Drivers from "/src/views/Drivers.vue";
import Race from "/src/views/Race.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/current",
    name: "Current Season",
    component: Current,
  },
  {
    path: "/seasons",
    name: "Seasons",
    component: Seasons,
  },
  { path: "/seasons/:season", name: "Season", component: Season },
  { path: "/seasons/:season/race/:round", name: "Race", component: Race },
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
