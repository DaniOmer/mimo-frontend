import { RouteRecordRaw } from "vue-router";

import AuthLayout from "../../layouts/AuthLayout.vue";
import RegisterView from "../../views/auth/RegisterView.vue";
import LoginView from "../../views/auth/LoginView.vue";
import RegisterConfirmationView from "../../views/auth/RegisterConfirmationView.vue";
import RegisterEmailConfirmationView from "../../views/auth/RegisterEmailConfirmationView.vue";
import { guestGuard } from "../../middlewares/guestGuard";
import ResetPasswordView from "../../views/auth/ResetPasswordView.vue";
import ResetPasswordConfirmView from "../../views/auth/ResetPasswordConfirmView.vue";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: AuthLayout,
    beforeEnter: guestGuard,
    children: [
      {
        path: "register",
        name: "register",
        component: RegisterView,
      },
      {
        path: "register/confirmation",
        name: "registerConfirmation",
        component: RegisterConfirmationView,
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "email-validation",
        name: "verifyEmail",
        component: RegisterEmailConfirmationView,
        props: (route) => ({ token: route.query.token }),
      },
      {
        path:"password/password-reset",
        name:"resetPassword",
        component: ResetPasswordView,
      },
      {
        path: "reset-password",
        name: "resetPasswordConfirm",
        component: ResetPasswordConfirmView,
        props: (route) => ({ token: route.query.token }), 
      }
    ],
  },
];
