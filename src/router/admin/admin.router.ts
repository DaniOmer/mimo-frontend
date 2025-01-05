import { RouteRecordRaw } from "vue-router";
import AdminUsersView from "../../views/admin/AdminUsersView.vue";
import AdminProductsView from "../../views/admin/product/AdminProductsView.vue";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin/users",
    name: "adminUsers",
    component: AdminUsersView,
  },
  {
    path: "/admin/products",
    name: "adminProducts",
    component: AdminProductsView,

  }
];
