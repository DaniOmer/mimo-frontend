import { createWebHistory, createRouter } from "vue-router";

import { publicRoutes } from "./main/main.router";
import { authRoutes } from "./auth/auth.router";
import { adminRoutes } from "./admin/admin.router";

const routes = [...publicRoutes, ...authRoutes, ...adminRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
