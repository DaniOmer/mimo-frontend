import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "../stores";

export const guestGuard = (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  if (
    authStore.isAuthenticated &&
    (to.name === "register" || to.name === "login")
  ) {
    next({ name: "homepage" });
  } else {
    next();
  }
};
