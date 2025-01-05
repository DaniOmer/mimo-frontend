import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  registerUser,
  verifyEmail,
  IUserCreate,
  IUser,
  IUserLogin,
  loginUser,
} from "../../api";
import { useUserStore } from "./user.store";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as IUser | null,
    token: null as string | null,
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["user", "token"],
  },

  getters: {
    isAuthenticated: (state) => {
      const userStore = useUserStore();
      return !!state.token && !!userStore.user;
    },
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    async register(userData: IUserCreate) {
      const { execute, status, error, data } = useApiRequest<IUser>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() => registerUser(userData, this.controller!.signal));

      this.user = data.value;
      this.error = error.value;
      this.status = status.value;
    },

    async verifyEmail(tokenData: { token: string }) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() => verifyEmail(tokenData, this.controller!.signal));

      this.error = error.value;
      this.status = status.value;
    },

    async login(userData: IUserLogin) {
      const { execute, status, error, data } = useApiRequest<{
        token: string;
        user: IUser;
      }>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() => loginUser(userData, this.controller!.signal));

      this.token = data.value?.token || null;
      this.error = error.value;
      this.status = status.value;

      const userStore = useUserStore();
      await userStore.fetchProfile(data.value?.user._id as string);
    },

    logout() {
      const userStore = useUserStore();
      userStore.resetUser();
      this.token = null;
      this.error = null;
      this.status = "idle";
    },

    resetStatus() {
      this.error = null;
      this.status = "idle";
    },

    cancelRequest() {
      const { cancel } = useApiRequest<void>();
      cancel();
    },
  },
});
