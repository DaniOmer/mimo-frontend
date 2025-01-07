import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "../stores";

export const adminGuard = (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  if (
    !authStore.isAuthenticated ||
    (!authStore.roles?.includes("admin") && to.name === "admin")
  ) {
    next({ name: "homepage" });
  } else {
    next();
  }
};
