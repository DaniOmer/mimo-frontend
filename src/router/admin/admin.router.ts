import { RouteRecordRaw } from "vue-router";
import AdminUsersView from "../../views/admin/AdminUsersView.vue";
import AdminProductsView from "../../views/admin/product/AdminProductsView.vue";
import AdminLayout from "../../components/layout/AdminLayout.vue";
import UserPersonalInfosView from "../../views/main/UserPersonalInfosView.vue";


export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'users',
        name: 'adminUsers',
        component: AdminUsersView,
      },
      {
        path: 'products',
        name: 'adminProducts',
        component: AdminProductsView,
      },
      {
        path: 'orders',
        name: 'adminOrders',
        component: AdminUsersView,
      },
      {
        path: 'reports',
        name: 'adminReports',
        component: AdminUsersView,
      },
      {
        path: 'settings',
        name: 'adminSettings',
        component: UserPersonalInfosView,
      },
      {
        path: 'logs',
        name: 'adminLogs',
        component: AdminUsersView,
      },
    ],
  },
 
];
