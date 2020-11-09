import { createWebHistory, createRouter } from "vue-router";

import { ROUTES } from "/src/constants";

const router = createRouter({
  history: createWebHistory(),
  routes: ROUTES,
});

export default router;
