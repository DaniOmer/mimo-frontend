import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/main/HomeView.vue";
import UserPersonalInfosView from "../../views/main/UserPersonalInfosView.vue";
import UserAddressView from "../../views/main/UserAddressView.vue";
import UserPreferenceView from "../../views/main/UserPreferenceView.vue";
import OrdersView from "../../views/main/UserOrdersView.vue";
import ContactView from "../../views/main/ContactView.vue";
import ConditionView from "../../views/main/ConditionView.vue";
import PrivacyView from "../../views/main/PrivacyView.vue";

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
        path: "addresses",
        name: "userAddresses",
        component: UserAddressView,
      },
      {
        path: "preferences",
        name: "userPreferences",
        component: UserPreferenceView,
      },
      {
        path: "orders",
        name: "userOrders",
        component: OrdersView, 
      }
    ],
  },
  {
    path: "/contact",
    component: MainLayout,
    children: [{ path: "", name: "contact", component: ContactView }],
  },
  {
    path: "/terms-and-conditions",
    component: MainLayout,
    children: [{ path: "", name: "terms", component: ConditionView }],
  },
  {
    path:"/privacy-policy",
    component: MainLayout,
    children: [{ path: "", name: "privacy", component: PrivacyView}],
  }
];
