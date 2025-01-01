import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/public/HomeView.vue";
import CatalogView from "../../views/public/CatalogView.vue";
import ProductDetailsView from "../../views/public/ProductDetailsView.vue";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "homepage", component: HomeView },
      { path: "catalog", name: "catalog", component: CatalogView },
      { 
        path: '/product/:id', 
        name: 'ProductDetails',
        component: ProductDetailsView,
        props: true,
      },
    ],
  },
];
