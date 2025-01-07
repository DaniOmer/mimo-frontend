import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "../stores";

export const authGuard = (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
};
