import { createWebHistory, createRouter } from "vue-router";

import { publicRoutes } from "./public/public.router";
import { authRoutes } from "./auth/auth.router";

const routes = [...publicRoutes, ...authRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
