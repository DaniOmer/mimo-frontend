import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/main/HomeView.vue";
import UserPersonalInfosView from "../../views/main/UserPersonalInfosView.vue";
import UserAddressView from "../../views/main/UserAddressView.vue";
import UserPreferenceView from "../../views/main/UserPreferenceView.vue";

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
    ],
  },
];
