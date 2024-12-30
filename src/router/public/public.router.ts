import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/public/HomeView.vue";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "", name: "homepage", component: HomeView }],
  },
];
