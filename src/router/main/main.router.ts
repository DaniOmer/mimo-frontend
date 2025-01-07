import { RouteRecordRaw } from "vue-router";

import MainLayout from "../../layouts/MainLayout.vue";
import HomeView from "../../views/main/HomeView.vue";
import UserPersonalInfosView from "../../views/main/UserPersonalInfosView.vue";
import CatalogView from "../../views/main/CatalogView.vue";
import ProductDetailsView from "../../views/main/ProductDetailsView.vue";
import CheckoutView from "../../views/main/CheckoutView.vue";
import PaymentMethodView from "../../views/main/PaymentMethodView.vue";
import NotFoundView from "../../views/main/NotFoundView.vue";
import UserAddressView from "../../views/main/UserAddressView.vue";
import UserPreferenceView from "../../views/main/UserPreferenceView.vue";
import OrdersView from "../../views/main/UserOrdersView.vue";
import AboutView from "../../views/main/AboutView.vue";
import ContactView from "../../views/main/ContactView.vue";
import ConditionView from "../../views/main/ConditionView.vue";
import PrivacyView from "../../views/main/PrivacyView.vue";
import CheckoutAddressView from "../../views/main/CheckoutAddressView.vue";
import checkoutConfirmationView from "../../views/main/checkoutConfirmationView.vue";

import { authGuard } from "../../middlewares/authGuard";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    beforeEnter: authGuard,
    children: [
      { path: "", name: "homepage", component: HomeView },
      { path: "catalog", name: "catalog", component: CatalogView },
      {
        path: "/product/:id",
        name: "ProductDetails",
        component: ProductDetailsView,
        props: true,
      },
      {
        path: "cart",
        name: "cart",
        component: CheckoutView,
        meta: { requiresAuth: true },
      },
      {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFoundView,
      },
    ],
  },
  {
    path: "/myaccount",
    name: "myaccount",
    component: MainLayout,
    meta: { requiresAuth: true },
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
      },
    ],
  },
  {
    path: "/checkout",
    name: "checkout",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "payment-method",
        name: "paymentMethod",
        component: PaymentMethodView,
      },
      {
        path: "address",
        name: "paymentAddress",
        component: CheckoutAddressView,
      },
      {
        path: "confirmation",
        name: "checkoutConfirmation",
        component: checkoutConfirmationView,
      },
    ],
  },
  {
    path: "/about",
    component: MainLayout,
    children: [{ path: "", name: "about", component: AboutView }],
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
    path: "/privacy-policy",
    component: MainLayout,
    children: [{ path: "", name: "privacy", component: PrivacyView }],
  },
];
