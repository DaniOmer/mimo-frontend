import { RouteRecordRaw } from "vue-router";
import AdminUsersView from "../../views/admin/AdminUsersView.vue";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin/users",
    name: "adminUsers",
    component: AdminUsersView,
  },
];
