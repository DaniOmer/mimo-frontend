import { RouteRecordRaw } from "vue-router";

import AuthLayout from "../../layouts/AuthLayout.vue";
import RegisterView from "../../views/auth/RegisterView.vue";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "/register", name: "register", component: RegisterView },
    ],
  },
];
