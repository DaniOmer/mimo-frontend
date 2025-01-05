import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/main/HomeView.vue";
import UserPersonalInfosView from "../../views/main/UserPersonalInfosView.vue";
import UserAddressView from "../../views/main/UserAddressView.vue";
import OrdersView from "../../views/main/UserOrdersView.vue";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "", name: "homepage", component: HomeView }],
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
      {
        path: "orders",
        name: "userOrders",
        component: OrdersView, 
      }
    ],
  },
];
