import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/public/HomeView.vue";
import CatalogView from "../../views/public/CatalogView.vue";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "homepage", component: HomeView },
      { path: "catalog", name: "catalog", component: CatalogView },
    ],
  },
];
