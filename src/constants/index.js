import Home from "/src/views/Home.vue";
import Seasons from "/src/views/Seasons.vue";
import Drivers from "/src/views/Drivers.vue";

export const ROUTES = [
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
  {
    path: "/drivers",
    name: "Drivers",
    component: Drivers,
  },
];

export default ROUTES;
