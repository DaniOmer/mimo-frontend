import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/main/HomeView.vue";
import UserPersonalInfosView from "../../views/main/UserPersonalInfosView.vue";
import UserAddressView from "../../views/main/UserAddressView.vue";
import CatalogView from "../../views/main/CatalogView.vue";
import ProductDetailsView from "../../views/main/ProductDetailsView.vue";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "homepage", component: HomeView },
      { path: "catalog", name: "catalog", component: CatalogView },
      {
        path: "/product/:id",
        name: "ProductDetails",
        component: ProductDetailsView,
        props: true,
      },
    ],
  },
  {
    path: "/myaccount",
    component: MainLayout,
    children: [
      {
        path: "personnal-infos",
        name: "userPersonnalInfos",
        component: UserPersonalInfosView,
      },
      {
        path: "address",
        name: "userAddress",
        component: UserAddressView,
      },
    ],
  },
];
