import { RouteRecordRaw } from "vue-router";

import AuthLayout from "../../layouts/AuthLayout.vue";
import RegisterView from "../../views/auth/RegisterView.vue";
import LoginView from "../../views/auth/LoginView.vue";
import RegisterConfirmationView from "../../views/auth/RegisterConfirmationView.vue";
import RegisterEmailConfirmationView from "../../views/auth/RegisterEmailConfirmationView.vue";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "register", name: "register", component: RegisterView },
      {
        path: "register/confirmation",
        name: "registerConfirmation",
        component: RegisterConfirmationView,
      },
      { path: "login", name: "login", component: LoginView },
      {
        path: "email-validation/:token",
        name: "verifyEmail",
        component: RegisterEmailConfirmationView,
        props: true,
      },
    ],
  },
];
